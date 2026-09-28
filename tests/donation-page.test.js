import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';

// Exercise the actual page script with a minimal DOM and mocked network.
const page = readFileSync(new URL('../src/pages/donate.astro', import.meta.url), 'utf8');
const script = stripTypeScriptTypes(page.split('<script>')[1].split('</script>')[0]);
function element() {
  return {
    hidden: true, disabled: true, textContent: '', listeners: {},
    classList: { add() {} },
    setAttribute(name) { if (name === 'hidden') this.hidden = true; },
    removeAttribute(name) { if (name === 'hidden') this.hidden = false; },
    addEventListener(name, fn) { this.listeners[name] = fn; },
  };
}
async function load(configured) {
  const nodes = new Map();
  const document = {
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, element());
      return nodes.get(selector);
    },
    querySelectorAll() { return []; },
  };
  runInNewContext(script, {
    document, crypto: { randomUUID: () => 'review-request' }, AbortSignal, Intl,
    fetch: async (url) => ({ ok: true, json: async () => ({ configured: url === '/api/donate-config' && configured }) }),
  });
  await new Promise(resolve => setImmediate(resolve));
  return nodes;
}

test('closed giving hides and disables gift choices and offers an alternative', async () => {
  const nodes = await load(false);
  assert.equal(nodes.get('#giving-fields').hidden, true);
  assert.equal(nodes.get('#giving-fields').disabled, true);
  assert.equal(nodes.get('#donate-banner').hidden, false);
  assert.equal(nodes.get('#giving-alternative').hidden, false);
});

test('giving disabled after page load restores the notice and locks the form', async () => {
  const nodes = await load(true);
  assert.equal(nodes.get('#giving-fields').hidden, false);
  assert.equal(nodes.get('#giving-fields').disabled, false);
  assert.equal(nodes.get('#donate-banner').hidden, true);
  await nodes.get('#donate-form').listeners.submit({ preventDefault() {} });
  assert.equal(nodes.get('#giving-fields').hidden, true);
  assert.equal(nodes.get('#giving-fields').disabled, true);
  assert.equal(nodes.get('#donate-submit').disabled, true);
  assert.equal(nodes.get('#donate-banner').hidden, false);
  assert.equal(nodes.get('#donate-banner').textContent, 'Online giving opens soon.');
  assert.equal(nodes.get('#giving-alternative').hidden, false);
});
