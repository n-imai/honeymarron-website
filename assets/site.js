document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  if ('serviceWorker' in navigator) {
    // PWA 無効化: 既存の SW があれば登録解除
    navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => {});
  }

  // 外部サイトの英語ページが存在しない場合、通常URLへフォールバック
  const linksNeedingFallback = Array.from(document.querySelectorAll('a[data-fallback-url]'));
  if (linksNeedingFallback.length > 0) {
    linksNeedingFallback.forEach(async (anchor) => {
      const href = anchor.getAttribute('href');
      const fallback = anchor.getAttribute('data-fallback-url');
      if (!href || !fallback) return;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      try {
        const res = await fetch(href, { method: 'HEAD', mode: 'cors', redirect: 'follow', signal: controller.signal });
        if (!res.ok) {
          anchor.setAttribute('href', fallback);
        }
      } catch (_e) {
        // CORS などで確認できない場合は何もしない（英語URLを優先）
      } finally {
        clearTimeout(timeoutId);
      }
    });
  }
});


