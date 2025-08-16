/* GA4 loader: Set your measurement ID below */
(function () {
  var MEASUREMENT_ID = 'G-ES97LL8LEJ';
  if (!MEASUREMENT_ID || /X{2,}/.test(MEASUREMENT_ID)) {
    return;
  }
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
})();


