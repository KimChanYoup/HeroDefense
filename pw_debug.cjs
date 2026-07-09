const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    args: ['--ignore-certificate-errors', '--no-sandbox'],
  });

  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  page.on('response', res => {
    const status = res.status();
    if (status >= 400) console.log(`[HTTP ${status}] ${res.url()}`);
  });
  page.on('pageerror', err => console.log(`[PAGE ERROR] ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[CONSOLE ERROR] ${msg.text()}`);
  });

  console.log('>> https://localhost:8443 이동 중...');
  await page.goto('https://localhost:8443', { waitUntil: 'networkidle', timeout: 20000 });
  console.log('>> 현재 URL:', page.url());

  // 회원가입 페이지로 이동
  console.log('>> 회원가입 페이지로 이동...');
  await page.goto('https://localhost:8443/register', { waitUntil: 'networkidle', timeout: 10000 });
  console.log('>> 현재 URL:', page.url());

  // 폼 입력
  console.log('>> 이메일 입력...');
  await page.fill('input[type="email"]', 'rlacksduq@naver.com');

  console.log('>> 별명 입력...');
  await page.fill('input[type="text"]', 'chkim');

  console.log('>> 비밀번호 입력...');
  const pwFields = await page.$$('input[type="password"]');
  await pwFields[0].fill('12341234');
  await pwFields[1].fill('12341234');

  console.log('>> 회원가입 버튼 클릭...');
  await page.screenshot({ path: '/tmp/before_submit.png' });
  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);
  console.log('>> 제출 후 URL:', page.url());
  await page.screenshot({ path: '/tmp/after_submit.png' });

  console.log('>> 완료. 30초 후 종료...');
  await page.waitForTimeout(30000);
  await browser.close();
})();
