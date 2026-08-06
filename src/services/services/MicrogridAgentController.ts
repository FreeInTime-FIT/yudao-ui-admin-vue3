// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request'
import { getAccessToken, getTenantId } from '@/utils/auth'

export interface MicrogridAgentChatRequest {
  message: string
  sessionId?: string
}

export interface MicrogridAgentChatResponse {
  sessionId: string
  answer: string
}

export interface MicrogridAgentStreamHandlers {
  onCreated: (responseId: string) => void
  onDelta: (delta: string) => void
  onCompleted: (responseId: string) => void
}

export async function cancelMicrogridAgentResponse(responseId: string) {
  return request<{ code: number; data: boolean; msg?: string }>({
    url: `/admin-api/microgrid-agent/chat/${encodeURIComponent(responseId)}/cancel`,
    method: 'POST'
  })
}

export async function chatWithMicrogridAgent(
  body: MicrogridAgentChatRequest,
  options?: { [key: string]: any }
) {
  return request<{
    code: number
    data: MicrogridAgentChatResponse
    msg?: string
  }>({
    url: '/admin-api/microgrid-agent/chat',
    method: 'POST',
    body,
    ...(options || {})
  })
}

export async function streamChatWithMicrogridAgent(
  body: MicrogridAgentChatRequest,
  handlers: MicrogridAgentStreamHandlers,
  signal?: AbortSignal
) {
  const baseUrl = (import.meta.env.VITE_BASE_URL || '').replace(/\/$/, '')
  const headers: Record<string, string> = {
    Accept: 'text/event-stream',
    'Content-Type': 'application/json'
  }
  const accessToken = getAccessToken()
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`
  if (import.meta.env.VITE_APP_TENANT_ENABLE === 'true') {
    const tenantId = getTenantId()
    if (tenantId) headers['tenant-id'] = tenantId
  }

  const response = await fetch(`${baseUrl}/admin-api/microgrid-agent/chat/stream`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal
  })
  if (!response.ok) {
    let message = '微电网智能体暂时不可用，请稍后重试'
    try {
      const errorBody = await response.json()
      message = errorBody.msg || errorBody.error?.message || message
    } catch {
      // Keep the stable user-facing fallback for non-JSON proxy errors.
    }
    throw new Error(message)
  }
  if (!response.body) throw new Error('浏览器无法读取流式响应')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let completed = false

  const handleFrame = (frame: string) => {
    const data = frame
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n')
    if (!data) return

    const event = JSON.parse(data)
    if (event.type === 'response.created') {
      const responseId = event.response?.id
      if (typeof responseId === 'string' && responseId.startsWith('resp_')) {
        handlers.onCreated(responseId)
      }
    } else if (event.type === 'response.output_text.delta' && typeof event.delta === 'string') {
      handlers.onDelta(event.delta)
    } else if (event.type === 'response.completed') {
      const responseId = event.response?.id
      if (typeof responseId !== 'string' || !responseId.startsWith('resp_')) {
        throw new Error('流式响应缺少有效会话编号')
      }
      completed = true
      handlers.onCompleted(responseId)
    } else if (event.type === 'error') {
      throw new Error(event.message || '流式响应失败')
    }
  }

  while (true) {
    const { done, value } = await reader.read()
    buffer += decoder.decode(value, { stream: !done })
    buffer = buffer.replace(/\r\n/g, '\n')
    const frames = buffer.split('\n\n')
    buffer = frames.pop() || ''
    frames.forEach(handleFrame)
    if (done) break
  }
  if (buffer.trim()) handleFrame(buffer)
  if (!completed) throw new Error('流式响应意外中断')
}
