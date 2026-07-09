import { chromium } from '/sgoinfre/chkim/trans/node_modules/playwright/index.js';

const browser = await chromium.launch({
  headless: false,
  devtools: true,
  args: ['--ignore-certificate-errors', '--no-sandbox'],
});

const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1400, height: 900 } });
const page = await context.newPage();

const logs = [];

page.on('console', msg => {
  const type = msg.type();
  const text = msg.text();
  if (type === 'error' || type === 'warning') {
    const entry = `[${type.toUpperCase()}] ${text}`;
    logs.push(entry);
    console.log(entry);
  }
});

page.on('requestfailed', req => {
  const entry = `[NET FAIL] ${req.method()} ${req.url()} — ${req.failure()?.errorText}`;
  logs.push(entry);
  console.log(entry);
});

page.on('pageerror', err => {
  const entry = `[PAGE ERROR] ${err.message}`;
  logs.push(entry);
  console.log(entry);
});

console.log('>> https://localhost:8443 로 이동 중...');
await page.goto('https://localhost:8443', { waitUntil: 'networkidle', timeout: 20000 });
console.log('>> 현재 URL:', page.url());
console.log('>> 브라우저가 열렸습니다. 직접 조작하세요.');
console.log('>> 콘솔 에러/경고는 이 터미널에 실시간 출력됩니다.');
console.log('>> 60초 후 자동 종료 및 요약 출력.\n');

await page.waitForTimeout(60000);

console.log('\n====== 캡처된 문제 요약 ======');
if (logs.length === 0) console.log('에러/경고 없음');
else logs.forEach(l => console.log(l));

await browser.close();
