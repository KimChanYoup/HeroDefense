const { chromium } = require('./node_modules/playwright');

const BASE = 'https://localhost:8443';
const EMAIL = 'rlacksduq@naver.com';
const PW = '12341234';

const PAGES = [
  { name: '프로필',      path: '/profile' },
  { name: '게임(솔로)',  path: '/game' },
  { name: '로비',        path: '/lobby' },
  { name: 'AI매치',      path: '/ai-game' },
  { name: '영웅',        path: '/heroes' },
  { name: '상점',        path: '/shop' },
  { name: '시너지',      path: '/synergy' },
  { name: '친구',        path: '/friends' },
  { name: '업적',        path: '/achievements' },
  { name: '토너먼트',    path: '/tournament' },
  { name: '리더보드',    path: '/leaderboard' },
  { name: '가이드',      path: '/guide' },
  { name: '튜토리얼',    path: '/tutorial' },
];

const LANGS = ['ko', 'en', 'ja'];

// 번역 누락 패턴 감지
const MISSING_KEY_PATTERNS = [
  /^\[.*\]$/,           // [missing_key]
  /^undefined$/,
  /^null$/,
  /translation missing/i,
  /\.undefined\./,
];

function isMissingKey(text) {
  if (!text || text.trim() === '') return false;
  return MISSING_KEY_PATTERNS.some(p => p.test(text.trim()));
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    args: ['--ignore-certificate-errors', '--no-sandbox'],
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1400, height: 900 },
  });
  const page = await context.newPage();

  // ── 전역 에러 수집 ────────────────────────────────────
  const allIssues = [];

  function addIssue(page, lang, type, detail) {
    const entry = { page, lang, type, detail };
    allIssues.push(entry);
    console.log(`  ⚠ [${type}] ${detail}`);
  }

  // ── 로그인 ────────────────────────────────────────────
  console.log('\n=== 로그인 ===');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 20000 });

  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PW);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/profile`, { timeout: 10000 }).catch(() => {});
  console.log('로그인 후 URL:', page.url());

  if (!page.url().includes('/profile')) {
    console.log('❌ 로그인 실패!');
    await browser.close();
    return;
  }
  console.log('✅ 로그인 성공');

  // ── 각 언어 × 각 페이지 테스트 ──────────────────────
  for (const lang of LANGS) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`언어: ${lang.toUpperCase()}`);
    console.log('='.repeat(50));

    // 언어 버튼 클릭
    const langBtn = page.locator(`button:has-text("${lang.toUpperCase()}")`).first();
    if (await langBtn.isVisible().catch(() => false)) {
      await langBtn.click();
      await page.waitForTimeout(500);
    }

    for (const { name, path } of PAGES) {
      console.log(`\n--- [${lang}] ${name} (${path}) ---`);

      const consoleErrors = [];
      const networkErrors = [];

      const onConsole = msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      };
      const onResponse = res => {
        if (res.status() >= 400) networkErrors.push(`HTTP ${res.status()}: ${res.url()}`);
      };
      const onPageError = err => consoleErrors.push(err.message);

      page.on('console', onConsole);
      page.on('response', onResponse);
      page.on('pageerror', onPageError);

      try {
        await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(1500);

        // 콘솔 에러
        for (const e of consoleErrors) {
          addIssue(name, lang, 'CONSOLE ERROR', e.slice(0, 120));
        }

        // 네트워크 에러 (favicon 제외)
        for (const e of networkErrors) {
          if (!e.includes('favicon')) addIssue(name, lang, 'NETWORK ERROR', e);
        }

        // 번역 누락 — 페이지 텍스트 검사
        const bodyText = await page.locator('body').innerText().catch(() => '');
        const lines = bodyText.split('\n').map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
          if (isMissingKey(line)) {
            addIssue(name, lang, 'MISSING TRANSLATION', line.slice(0, 80));
          }
        }

        // 빈 버튼/링크 검사
        const emptyBtns = await page.$$eval(
          'button, a',
          els => els
            .filter(el => !el.querySelector('img,svg') && el.innerText.trim() === '')
            .map(el => el.outerHTML.slice(0, 80))
        );
        for (const b of emptyBtns.slice(0, 3)) {
          addIssue(name, lang, 'EMPTY BUTTON/LINK', b);
        }

        console.log('  ✅ 로드 완료');
      } catch (e) {
        addIssue(name, lang, 'PAGE LOAD FAIL', e.message.slice(0, 100));
      } finally {
        page.off('console', onConsole);
        page.off('response', onResponse);
        page.off('pageerror', onPageError);
      }
    }
  }

  // ── 최종 리포트 ──────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('최종 이슈 리포트');
  console.log('='.repeat(60));

  if (allIssues.length === 0) {
    console.log('✅ 발견된 이슈 없음');
  } else {
    const byType = {};
    for (const issue of allIssues) {
      if (!byType[issue.type]) byType[issue.type] = [];
      byType[issue.type].push(issue);
    }
    for (const [type, list] of Object.entries(byType)) {
      console.log(`\n[${type}] — ${list.length}건`);
      for (const i of list) {
        console.log(`  • [${i.lang}] ${i.page}: ${i.detail}`);
      }
    }
  }

  console.log('\n\n>> 30초 후 종료...');
  await page.waitForTimeout(30000);
  await browser.close();
})();
