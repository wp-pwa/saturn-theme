// Uglify using:
// npx uglify-js lazyload-instance.js --output lazyload-instance.min.js --compress --mangle

if (!window.document.lazyLoadInstance) {
  window.document.lazyLoadInstance = new window.LazyLoad({
    element_selector: '.lazy',
    thresholds: '0px -1px',
  });
}
