export default ({ siteId, pageId, formatId, target }) => `
    <!doctype html>
    <html>
    <head>
    <style>html,body{margin:0;padding:0;overflow:hidden;}</style>
    <script src="//www8.smartadserver.com/config.js?nwid=2506" type="text/javascript"></script>
    <script>
    (function(w, b) {
      var noad = false;
      w.sas.setup({domain: '//www8.smartadserver.com'});
      w.sas.call('std', {
        siteId: '${siteId}',
        pageId: '${pageId}',
        formatId: '${formatId}',
        target: '${target}'
      });

      w.onload = function () {
        var width = '330';
        // var container = document.querySelector('#sas_${formatId} img');
        // if(container && container.getAttribute('width') === '100%') {
        //   width = '300';
        // } else {
        // }
        // var iframe = document.getElementsByTagName('iframe')[0];
        // var width = iframe.width;
        // var height = iframe.height;
        var width = document.body.scrollWidth.toString();
        var height = document.body.offsetHeight.toString();
        parent.postMessage(JSON.stringify({
          width: width,
          height: height
        }), "*");
      };

    })(window, document.body)
    </script>
    </head>
    <body>
      <div id="sas_${formatId}" class="centered"></div>
    </body>
    </html>
  `;
