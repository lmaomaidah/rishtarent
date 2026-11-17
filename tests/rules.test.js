import test from 'node:test'
import assert from 'node:assert/strict'
import { checkPartySize, MAX_PARTY } from '../src/rules/capacity.js'

test('party size: ordinary valid', () => {
  const r = checkPartySize(3)
  assert.equal(r.ok, true)
  assert.equal(r.message, '')
})

test('party size: exactly at limit', () => {
  const r = checkPartySize(MAX_PARTY)
  assert.equal(r.ok, true)
  assert.equal(r.message, '')
})

test('party size: lower limit', () => {
  const r = checkPartySize(1)
  assert.equal(r.ok, true)
  assert.equal(r.message, '')
})

test('party size: one over the limit', () => {
  const r = checkPartySize(7)
  assert.equal(r.ok, false)
  assert.match(r.message, /at most 6/)
})

test('party size: zero', () => {
  const r = checkPartySize(0)
  assert.equal(r.ok, false)
  assert.match(r.message, /At least 1/)
})
