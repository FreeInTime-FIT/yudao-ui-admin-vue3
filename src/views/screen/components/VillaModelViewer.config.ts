export type SceneMode = 'overall' | 'substation'

export type ModelSceneConfig = {
  url: string
  clickableNodeNames: string[]
  showBackButton: boolean
  hintText?: string
}

export const DEFAULT_CLICKABLE_NODE_NAMES = ['biandian.glb', '变电房.glb']

const SCENE_CONFIGS: Record<SceneMode, ModelSceneConfig> = {
  overall: {
    url: '/models/villa-power/zhengti.glb',
    clickableNodeNames: DEFAULT_CLICKABLE_NODE_NAMES,
    showBackButton: false,
    hintText: '点击查看变电房'
  },
  substation: {
    url: '/models/villa-power/biandian.glb',
    clickableNodeNames: [],
    showBackButton: true
  }
}

const normalizeNodeName = (name: string): string => {
  return name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}_-]+/gu, '')
}

export const getSceneConfig = (sceneMode: SceneMode): ModelSceneConfig => {
  return SCENE_CONFIGS[sceneMode]
}

export const findClickableNodeName = (
  nodeNames: Array<string | null | undefined>,
  clickableNodeNames: string[] = DEFAULT_CLICKABLE_NODE_NAMES
): string | null => {
  const normalizedTargetMap = new Map(
    clickableNodeNames.map((name) => [normalizeNodeName(name), name] as const)
  )

  for (const nodeName of nodeNames) {
    if (!nodeName) {
      continue
    }
    const matchedName = normalizedTargetMap.get(normalizeNodeName(nodeName))
    if (matchedName) {
      return matchedName
    }
  }

  return null
}
