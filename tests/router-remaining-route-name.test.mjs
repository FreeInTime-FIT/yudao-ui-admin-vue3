import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const remainingRouterPath = path.resolve('src/router/modules/remaining.ts')

function getStringValue(node) {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }
  return undefined
}

function buildRoute(node) {
  if (!ts.isObjectLiteralExpression(node)) return null

  let name
  let children = []

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    const key = property.name
    if (!key || !ts.isIdentifier(key)) continue

    if (key.text === 'name') {
      name = getStringValue(property.initializer)
    }

    if (key.text === 'children' && ts.isArrayLiteralExpression(property.initializer)) {
      children = property.initializer.elements
        .map((element) => buildRoute(element))
        .filter(Boolean)
    }
  }

  return { name, children }
}

function getRemainingRoutes() {
  const sourceText = fs.readFileSync(remainingRouterPath, 'utf8')
  const sourceFile = ts.createSourceFile(remainingRouterPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  let routes = []

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'remainingRouter') continue
      if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) continue
      routes = declaration.initializer.elements.map((element) => buildRoute(element)).filter(Boolean)
    }
  }

  return routes
}

function collectConflicts(routes, ancestors = []) {
  const conflicts = []

  for (const route of routes) {
    if (!route) continue
    if (route.name && ancestors.includes(route.name)) {
      conflicts.push([...ancestors, route.name].join(' -> '))
    }
    conflicts.push(...collectConflicts(route.children ?? [], route.name ? [...ancestors, route.name] : ancestors))
  }

  return conflicts
}

test('remainingRouter 中子路由名称不能与祖先路由重复', () => {
  const routes = getRemainingRoutes()
  const conflicts = collectConflicts(routes)

  assert.deepEqual(conflicts, [])
})
