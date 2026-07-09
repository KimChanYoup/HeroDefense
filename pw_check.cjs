const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox'],
  });
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  await page.goto('https://localhost:8443/login', { waitUntil: 'networkidle', timeout: 15000 });
  await page.fill('input[type="email"]', 'rlacksduq@naver.com');
  await page.fill('input[type="password"]', '12341234');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/profile', { timeout: 10000 });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/profile_ko.png', fullPage: true });
  console.log('KO 스크린샷 저장: /tmp/profile_ko.png');

  // "[수정]" 텍스트 실제 화면 존재 여부 확인
  const bracketTexts = await page.$$eval('*', els =>
    els
      .filter(el => el.children.length === 0 && /\[.+\]/.test(el.innerText?.trim()))
      .map(el => ({ tag: el.tagName, text: el.innerText.trim(), class: el.className }))
  );
  console.log('\n대괄호 텍스트 발견:', bracketTexts.length > 0 ? JSON.stringify(bracketTexts, null, 2) : '없음');

  await browser.close();
})();
