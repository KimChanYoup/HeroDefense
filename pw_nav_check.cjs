const { chromium } = require('./node_modules/playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false,
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

  // 데스크톱 nav 실제 표시 여부 확인
  const desktopNavVisible = await page.locator('.hidden.xl\\:flex').isVisible().catch(() => false);
  const hamburgerVisible = await page.locator('.xl\\:hidden svg').first().isVisible().catch(() => false);

  // 실제 화면 너비 확인
  const width = await page.evaluate(() => window.innerWidth);

  // xl: 클래스 CSS 확인
  const xlFlexComputed = await page.evaluate(() => {
    const el = document.querySelector('.hidden');
    if (!el) return 'not found';
    return window.getComputedStyle(el).display;
  });

  console.log('window.innerWidth:', width);
  console.log('데스크톱 nav (.hidden.xl:flex) 표시됨:', desktopNavVisible);
  console.log('햄버거 버튼 표시됨:', hamburgerVisible);

  // 빌드된 CSS에 xl 미디어쿼리 있는지 확인
  const hasXlMedia = await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    for (const sheet of sheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule.media && rule.conditionText?.includes('1280')) return true;
        }
      } catch(e) {}
    }
    return false;
  });
  console.log('빌드 CSS에 1280px 미디어쿼리 존재:', hasXlMedia);

  await page.screenshot({ path: '/tmp/nav_check.png' });
  await page.waitForTimeout(5000);
  await browser.close();
})();
