import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DEFAULT_CLICKABLE_NODE_NAMES,
  findClickableNodeName,
  getSceneConfig,
} from '../src/views/screen/components/VillaModelViewer.config.ts'

test('默认可点击节点包含右下角变电房根节点 biandian.glb', () => {
  assert.equal(DEFAULT_CLICKABLE_NODE_NAMES.includes('biandian.glb'), true)
})

test('默认可点击节点仍保留变电房别名节点', () => {
  assert.equal(DEFAULT_CLICKABLE_NODE_NAMES.includes('变电房.glb'), true)
})

test('命中运行时被去掉点号的 biandianglb 祖先链时仍应识别为 biandian.glb', () => {
  const matchedName = findClickableNodeName(['Box399', 'Group001_2', 'biandianglb', 'Scene'])
  assert.equal(matchedName, 'biandian.glb')
})

test('命中运行时被去掉点号的 变电房glb 祖先链时仍应识别为变电房.glb', () => {
  const matchedName = findClickableNodeName(['Box479', 'Group001', '变电房glb', 'Scene'])
  assert.equal(matchedName, '变电房.glb')
})

test('命中原始 biandian.glb 祖先链时应识别为 biandian.glb', () => {
  const matchedName = findClickableNodeName(['Box399', 'Group001', 'biandian.glb', 'Scene'])
  assert.equal(matchedName, 'biandian.glb')
})

test('命中原始变电房节点时应识别为可点击目标', () => {
  const matchedName = findClickableNodeName(['Box479', 'Group001', '变电房.glb', 'Scene'])
  assert.equal(matchedName, '变电房.glb')
})

test('未命中配置节点时不应触发场景切换', () => {
  const matchedName = findClickableNodeName(['Box479', 'Group001', 'Scene'])
  assert.equal(matchedName, null)
})

test('整体场景与局部场景返回不同的模型配置', () => {
  const overall = getSceneConfig('overall')
  const substation = getSceneConfig('substation')

  assert.equal(overall.url, '/models/villa-power/zhengti.glb')
  assert.deepEqual(overall.clickableNodeNames, DEFAULT_CLICKABLE_NODE_NAMES)
  assert.equal(overall.showBackButton, false)

  assert.equal(substation.url, '/models/villa-power/biandian.glb')
  assert.equal(substation.showBackButton, true)
})
