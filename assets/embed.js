// Embed mode: add ?embed=1 to any tool URL to show it inside an <iframe>.
// - hides the tool navigation (the frame shows a single tool)
// - links to ledwall.nyc open in the top window and are tagged utm_source=ledwall.nyc
// Load with `defer` at the end of <head>.
(() => {
  'use strict';
  let embed = false;
  try { embed = new URLSearchParams(location.search).get('embed') === '1'; } catch { /* old browser */ }
  if (!embed) return;
  document.documentElement.classList.add('embed');

  const style = document.createElement('style');
  style.textContent = '.embed .nav{display:none}.embed .brand{pointer-events:none}';
  document.head.appendChild(style);

  document.querySelectorAll('a[href]').forEach((a) => {
    let url;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (/(^|\.)ledwall\.nyc$/.test(url.hostname)) {
      url.searchParams.set('utm_source', 'ledwall.nyc');
      url.searchParams.set('utm_medium', 'toolkit-embed');
      a.href = url.toString();
      a.target = '_top';
      a.rel = 'noopener';
    } else if (url.origin === location.origin) {
      // Internal links stay in embed mode.
      url.searchParams.set('embed', '1');
      a.href = url.toString();
    } else {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
})();
