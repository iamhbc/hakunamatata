'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const ejs = require('ejs');
const Haiku = require('../models/haiku');
const app = require('../app');

test('MVC app serves its page and assets regardless of working directory', async t => {
  const previous = process.cwd();
  process.chdir(os.tmpdir());
  const server = app.listen(0, '127.0.0.1');
  t.after(async () => { process.chdir(previous); await new Promise(resolve => server.close(resolve)); });
  await new Promise((resolve,reject) => {server.once('listening',resolve);server.once('error',reject);});
  const base = `http://127.0.0.1:${server.address().port}`;
  const page = await fetch(base);
  assert.equal(page.status,200);
  const html = await page.text();
  assert.match(html,/Haikus for Mona/);
  assert.equal((html.match(/class="haikus"/g)||[]).length,Haiku.list().length);
  assert.equal((await fetch(`${base}/css/main.css`)).status,200);
  for (const item of Haiku.list()) assert.equal((await fetch(`${base}/images/${item.image}`)).status,200);
  assert.equal((await fetch(`${base}/missing`)).status,404);
});

test('haiku text is escaped and catalog callers cannot mutate model records', async () => {
  const rows = Haiku.list();
  rows[0].text = '<script>alert(1)</script>';
  const html = await ejs.renderFile(path.join(__dirname,'../views/index.ejs'),{haikus:rows});
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.notEqual(Haiku.list()[0].text,rows[0].text);
});
