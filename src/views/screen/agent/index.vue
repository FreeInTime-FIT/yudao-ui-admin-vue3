<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { marked } from 'marked'
import {
  cancelMicrogridAgentResponse,
  streamChatWithMicrogridAgent
} from '@/services/services/MicrogridAgentController'

defineOptions({ name: 'MicrogridAgent' })

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  renderedHtml?: string
  status?: 'sending' | 'streaming' | 'done' | 'error'
  time: string
}

type TypewriterController = {
  push: (text: string) => void
  drain: () => Promise<void>
  stop: () => void
}

type MarkdownRenderController = {
  schedule: () => void
  flush: () => void
  stop: () => void
}

const MARKDOWN_RENDER_INTERVAL_MS = 48

const input = ref('')
const sessionId = ref<string>()
const sending = ref(false)
const messageListRef = ref<HTMLElement>()
const messages = ref<ChatMessage[]>([])
const activeController = ref<AbortController>()
const activeResponseId = ref<string>()
const activeTypewriter = ref<TypewriterController>()

const suggestions = [
  '列出我有权限的微电网项目',
  '汇总各项目当前运行状态',
  '哪些项目最近出现过告警',
  '比较各项目的储能和光伏配置'
]

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const formatTime = () =>
  new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date())

const renderMarkdown = (content: string) =>
  marked.parse(content, {
    async: false,
    breaks: true,
    gfm: true
  }) as string

const createMarkdownRenderer = (render: () => void): MarkdownRenderController => {
  let timer: ReturnType<typeof setTimeout> | undefined

  const flush = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
    render()
  }

  return {
    schedule() {
      if (!timer) timer = setTimeout(flush, MARKDOWN_RENDER_INTERVAL_MS)
    },
    flush,
    stop() {
      if (timer) clearTimeout(timer)
      timer = undefined
    }
  }
}

const createTypewriter = (onText: (text: string) => void): TypewriterController => {
  const characters: string[] = []
  const drainResolvers: Array<() => void> = []
  let cursor = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let stopped = false

  const resolveDrains = () => {
    while (drainResolvers.length) drainResolvers.shift()?.()
  }

  const schedule = () => {
    if (!timer && !stopped) timer = setTimeout(tick, 20)
  }

  const tick = () => {
    timer = undefined
    if (stopped) return

    const remaining = characters.length - cursor
    if (remaining <= 0) {
      characters.length = 0
      cursor = 0
      resolveDrains()
      return
    }

    const batchSize =
      remaining > 800 ? 12 : remaining > 300 ? 8 : remaining > 120 ? 5 : remaining > 40 ? 3 : 1
    onText(characters.slice(cursor, cursor + batchSize).join(''))
    cursor += batchSize
    if (cursor < characters.length) schedule()
    else {
      characters.length = 0
      cursor = 0
      resolveDrains()
    }
  }

  return {
    push(text) {
      if (!text || stopped) return
      characters.push(...Array.from(text))
      schedule()
    },
    drain() {
      if (stopped || (!timer && cursor >= characters.length)) return Promise.resolve()
      return new Promise<void>((resolve) => drainResolvers.push(resolve))
    },
    stop() {
      stopped = true
      if (timer) clearTimeout(timer)
      timer = undefined
      characters.length = 0
      cursor = 0
      resolveDrains()
    }
  }
}

const resetConversation = () => {
  sessionId.value = undefined
  input.value = ''
  messages.value = []
  activeResponseId.value = undefined
}

const stopGeneration = () => {
  const responseId = activeResponseId.value
  activeTypewriter.value?.stop()
  activeController.value?.abort()
  if (responseId) {
    void cancelMicrogridAgentResponse(responseId).catch(() => undefined)
  }
}

const scrollToLatest = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight
  }
}

const sendMessage = async (preset?: string) => {
  const content = (preset ?? input.value).trim()
  if (!content || sending.value) return

  input.value = ''
  const userMessage: ChatMessage = {
    id: createId(),
    role: 'user',
    content,
    status: 'done',
    time: formatTime()
  }
  const assistantMessage = reactive<ChatMessage>({
    id: createId(),
    role: 'assistant',
    content: '',
    renderedHtml: '',
    status: 'sending',
    time: formatTime()
  })
  const markdownRenderer = createMarkdownRenderer(() => {
    assistantMessage.renderedHtml = renderMarkdown(assistantMessage.content)
  })
  messages.value.push(userMessage, assistantMessage)
  sending.value = true
  await scrollToLatest()

  try {
    const controller = new AbortController()
    const typewriter = createTypewriter((text) => {
      assistantMessage.content += text
      markdownRenderer.schedule()
      void scrollToLatest()
    })
    activeController.value = controller
    activeTypewriter.value = typewriter
    await streamChatWithMicrogridAgent(
      {
        message: content,
        sessionId: sessionId.value
      },
      {
        onCreated: (responseId) => {
          activeResponseId.value = responseId
        },
        onDelta: (delta) => {
          assistantMessage.status = 'streaming'
          typewriter.push(delta)
        },
        onCompleted: (responseId) => {
          sessionId.value = responseId
        }
      },
      controller.signal
    )
    await typewriter.drain()
    markdownRenderer.flush()
    assistantMessage.status = 'done'
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      assistantMessage.content ||= '已停止生成。'
      assistantMessage.status = 'done'
    } else {
      assistantMessage.content ||= '这次分析未完成，请稍后重试。'
      assistantMessage.status = 'error'
    }
    markdownRenderer.flush()
  } finally {
    markdownRenderer.stop()
    activeTypewriter.value?.stop()
    activeController.value = undefined
    activeResponseId.value = undefined
    activeTypewriter.value = undefined
    sending.value = false
    await scrollToLatest()
  }
}

const retryMessage = (index: number) => {
  const previous = messages.value[index - 1]
  if (!previous || previous.role !== 'user') return
  messages.value.splice(index - 1, 2)
  void sendMessage(previous.content)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    void sendMessage()
  }
}
</script>

<template>
  <div class="agent-workspace">
    <main class="conversation-panel">
      <div class="conversation-toolbar">
        <div>
          <div class="workspace-label">分析范围</div>
          <h1>全部授权项目</h1>
        </div>
        <ElTooltip content="新建会话" placement="bottom">
          <ElButton class="icon-button" circle :disabled="sending" @click="resetConversation">
            <Icon icon="ep:refresh-right" />
          </ElButton>
        </ElTooltip>
      </div>

      <div ref="messageListRef" class="message-list">
        <div v-if="messages.length === 0" class="empty-state">
          <div class="agent-mark">
            <Icon icon="ep:data-analysis" />
          </div>
          <div class="empty-project">全局微电网分析</div>
          <div class="suggestion-grid">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              type="button"
              class="suggestion"
              :disabled="sending"
              @click="sendMessage(suggestion)"
            >
              <span>{{ suggestion }}</span>
              <Icon icon="ep:right" />
            </button>
          </div>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="message.id"
          class="message-row"
          :class="message.role"
        >
          <div v-if="message.role === 'assistant'" class="avatar assistant-avatar">
            <Icon icon="ep:data-analysis" />
          </div>
          <div class="message-content">
            <div class="message-meta">
              <span>{{ message.role === 'assistant' ? '微电网智能体' : '我' }}</span>
              <time>{{ message.time }}</time>
            </div>
            <div class="message-bubble" :class="{ failed: message.status === 'error' }">
              <div v-if="message.status === 'sending' && !message.content" class="thinking">
                <span></span><span></span><span></span>
              </div>
              <div
                v-else-if="message.role === 'assistant'"
                v-dompurify-html="message.renderedHtml ?? ''"
                class="answer-text markdown-body"
              ></div>
              <div v-else class="answer-text">{{ message.content }}</div>
            </div>
            <ElButton
              v-if="message.status === 'error'"
              link
              class="retry-button"
              @click="retryMessage(index)"
            >
              <Icon icon="ep:refresh" />
              重试
            </ElButton>
          </div>
          <div v-if="message.role === 'user'" class="avatar user-avatar">
            <Icon icon="ep:user" />
          </div>
        </div>
      </div>

      <div class="composer">
        <ElInput
          v-model="input"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          resize="none"
          maxlength="4000"
          :disabled="sending"
          placeholder="输入问题"
          @keydown="handleKeydown"
        />
        <ElTooltip :content="sending ? '停止生成' : '发送'" placement="top">
          <ElButton
            class="send-button"
            circle
            :disabled="!sending && !input.trim()"
            @click="sending ? stopGeneration() : sendMessage()"
          >
            <Icon :icon="sending ? 'ep:video-pause' : 'ep:promotion'" />
          </ElButton>
        </ElTooltip>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.agent-workspace {
  --panel-border: rgba(107, 147, 201, 0.24);
  --muted-text: rgba(225, 235, 249, 0.62);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  height: 100%;
  min-height: 0;
  background: #0b1325;
  color: #edf5ff;
}

.conversation-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-width: 0;
  min-height: 0;
}

.conversation-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--panel-border);
  background: #101b31;

  h1 {
    margin: 2px 0 0;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0;
  }
}

.workspace-label {
  color: #5fd4c5;
  font-size: 12px;
}

.icon-button {
  width: 38px;
  height: 38px;
  color: #dbeafe;
  border-color: var(--panel-border);
  background: #172641;
}

.message-list {
  min-height: 0;
  overflow-y: auto;
  padding: 28px clamp(18px, 4vw, 56px);
  scrollbar-color: rgba(127, 159, 201, 0.5) transparent;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(720px, 100%);
  min-height: 100%;
  margin: 0 auto;
}

.agent-mark {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid rgba(95, 212, 197, 0.42);
  border-radius: 8px;
  color: #5fd4c5;
  background: rgba(27, 107, 102, 0.22);
  font-size: 25px;
}

.empty-project {
  margin: 18px 0 24px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0;
}

.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.suggestion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 12px 14px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  color: #dbeafe;
  background: #121f36;
  font: inherit;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;

  &:hover:not(:disabled) {
    border-color: rgba(95, 212, 197, 0.58);
    background: #172b43;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .iconify {
    flex: 0 0 auto;
    margin-left: 10px;
    color: #5fd4c5;
  }
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: min(860px, 100%);
  margin: 0 auto 26px;

  &.user {
    justify-content: flex-end;

    .message-content {
      align-items: flex-end;
    }

    .message-bubble {
      color: #f8fbff;
      background: #245d74;
      border-color: rgba(95, 212, 197, 0.26);
    }
  }
}

.avatar {
  display: grid;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 6px;
}

.assistant-avatar {
  color: #5fd4c5;
  background: #153938;
}

.user-avatar {
  color: #ffd166;
  background: #493c20;
}

.message-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: min(720px, calc(100% - 46px));
}

.message-meta {
  display: flex;
  gap: 10px;
  margin: 0 2px 7px;
  color: var(--muted-text);
  font-size: 12px;

  span {
    color: #dce9f8;
    font-weight: 600;
  }
}

.message-bubble {
  min-height: 42px;
  padding: 12px 14px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  background: #14213a;

  &.failed {
    border-color: rgba(255, 123, 107, 0.48);
    background: rgba(93, 39, 38, 0.42);
  }
}

.answer-text {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  line-height: 1.72;
}

.markdown-body {
  min-width: 0;
  white-space: normal;

  :deep(> :first-child) {
    margin-top: 0;
  }

  :deep(> :last-child) {
    margin-bottom: 0;
  }

  :deep(p) {
    margin: 0 0 12px;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin: 20px 0 10px;
    color: #f4f9ff;
    font-weight: 650;
    line-height: 1.4;
    letter-spacing: 0;
  }

  :deep(h1) {
    font-size: 20px;
  }

  :deep(h2) {
    font-size: 18px;
  }

  :deep(h3),
  :deep(h4) {
    font-size: 16px;
  }

  :deep(ul),
  :deep(ol) {
    margin: 8px 0 14px;
    padding-left: 24px;
  }

  :deep(li) {
    margin: 5px 0;
    padding-left: 2px;
  }

  :deep(li::marker) {
    color: #6fd9cd;
  }

  :deep(strong) {
    color: #ffffff;
    font-weight: 700;
  }

  :deep(a) {
    color: #79ddd1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  :deep(blockquote) {
    margin: 14px 0;
    padding: 8px 12px;
    border-left: 3px solid #5fd4c5;
    color: #c9d8ea;
    background: rgba(95, 212, 197, 0.08);
  }

  :deep(code) {
    padding: 2px 5px;
    border: 1px solid rgba(107, 147, 201, 0.24);
    border-radius: 4px;
    color: #a9efe5;
    background: #0b1529;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    max-width: 100%;
    margin: 14px 0;
    padding: 14px;
    overflow-x: auto;
    border: 1px solid rgba(107, 147, 201, 0.3);
    border-radius: 6px;
    background: #091326;
  }

  :deep(pre code) {
    padding: 0;
    border: 0;
    color: #dce9f8;
    background: transparent;
    white-space: pre;
  }

  :deep(table) {
    display: block;
    width: max-content;
    min-width: 100%;
    max-width: 100%;
    margin: 14px 0 16px;
    overflow-x: auto;
    border: 1px solid rgba(107, 147, 201, 0.36);
    border-spacing: 0;
    border-collapse: collapse;
    border-radius: 6px;
    scrollbar-color: rgba(127, 159, 201, 0.5) transparent;
  }

  :deep(th),
  :deep(td) {
    min-width: 84px;
    padding: 9px 12px;
    border-right: 1px solid rgba(107, 147, 201, 0.24);
    border-bottom: 1px solid rgba(107, 147, 201, 0.24);
    text-align: left;
    white-space: nowrap;
  }

  :deep(th) {
    color: #f2f8ff;
    background: #1a2b47;
    font-weight: 650;
  }

  :deep(tr:nth-child(even) td) {
    background: rgba(107, 147, 201, 0.07);
  }

  :deep(th:last-child),
  :deep(td:last-child) {
    border-right: 0;
  }

  :deep(tr:last-child td) {
    border-bottom: 0;
  }

  :deep(hr) {
    margin: 18px 0;
    border: 0;
    border-top: 1px solid rgba(107, 147, 201, 0.3);
  }
}

.thinking {
  display: flex;
  align-items: center;
  height: 18px;
  gap: 5px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5fd4c5;
    animation: pulse 1.2s infinite ease-in-out;
  }

  span:nth-child(2) {
    animation-delay: 120ms;
  }

  span:nth-child(3) {
    animation-delay: 240ms;
  }
}

.retry-button {
  margin-top: 5px;
  color: #ff9a87;
}

.composer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44px;
  align-items: end;
  gap: 10px;
  padding: 14px clamp(18px, 4vw, 56px) 18px;
  border-top: 1px solid var(--panel-border);
  background: #101b31;

  :deep(.el-textarea__inner) {
    min-height: 52px !important;
    padding: 14px 16px;
    border: 1px solid rgba(107, 147, 201, 0.34);
    border-radius: 6px;
    color: #f0f7ff;
    background: #0b1529;
    box-shadow: none;
    line-height: 1.55;

    &:focus {
      border-color: #5fd4c5;
      box-shadow: 0 0 0 1px rgba(95, 212, 197, 0.18);
    }
  }
}

.send-button {
  width: 44px;
  height: 44px;
  border: 0;
  color: #071421;
  background: #5fd4c5;
  font-size: 19px;

  &:hover,
  &:focus {
    color: #071421;
    background: #7be4d7;
  }
}

@keyframes pulse {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

@media (max-width: 900px) {
  .agent-workspace {
    grid-template-columns: minmax(0, 1fr);
  }

  .conversation-panel {
    border-right: 0;
  }
}

@media (max-width: 600px) {
  .conversation-toolbar {
    min-height: 64px;
    padding: 10px 14px;

    h1 {
      max-width: 240px;
      overflow: hidden;
      font-size: 17px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .message-list {
    padding: 18px 12px;
  }

  .suggestion-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .empty-project {
    font-size: 20px;
  }

  .composer {
    padding: 10px 12px 12px;
  }

  .message-content {
    max-width: calc(100% - 42px);
  }
}
</style>
