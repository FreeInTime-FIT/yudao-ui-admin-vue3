import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'

const targetFile = new URL('../src/views/screen/data/taiziCity.vue', import.meta.url)
const expectedAssetFile = new URL(
  '../src/views/screen/assets/taizi_city/photovoltaic-green-power-mode.jpg',
  import.meta.url,
)

async function readSource() {
  return readFile(targetFile, 'utf8')
}

test('taiziCity 页面应从 screen assets 目录引入图片资源', async () => {
  const source = await readSource()

  await access(expectedAssetFile, constants.F_OK)
  assert.match(source, /@\/views\/screen\/assets\/taizi_city\/photovoltaic-green-power-mode\.jpg/)
  assert.doesNotMatch(source, /\.\.\/\.\.\/\.\.\/\.\.\/fc80198a8c7eccb229cc4b992fe85def\.jpg/)
})

test('taiziCity 页面应包含图片节点与居中容器', async () => {
  const source = await readSource()

  assert.match(source, /taizi-city/)
  assert.match(source, /taizi-city__content/)
  assert.match(source, /taizi-city__image/)
  assert.match(source, /<img[^>]+:src="taiziCityImage"/)
})

test('taiziCity 页面样式应让图片水平垂直居中', async () => {
  const source = await readSource()

  assert.match(source, /\.taizi-city__content[\s\S]*display:\s*flex/)
  assert.match(source, /\.taizi-city__content[\s\S]*justify-content:\s*center/)
  assert.match(source, /\.taizi-city__content[\s\S]*align-items:\s*center/)
  assert.match(source, /\.taizi-city__image[\s\S]*max-width:\s*100%/)
  assert.match(source, /\.taizi-city__image[\s\S]*max-height:\s*100%/)
})

test('taiziCity 页面根容器背景应显式为白色', async () => {
  const source = await readSource()

  assert.match(source, /\.taizi-city[\s\S]*background(?:-color)?:\s*(?:#fff|#ffffff|white)/i)
})
