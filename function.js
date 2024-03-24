window.function = function (html, fileName) {
    html = html.value ?? "No HTML set.";
    fileName = fileName.value ?? "image";

    const customCSS = `
    body {
      margin: 0!important
    }

    button#download {
      position: fixed;
      top: 8px;
      right: 8px;
    }
    `;

    const originalHTML = `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.0.0-rc.7/html2canvas.min.js"></script>
      <style>${customCSS}</style>
      <div class="main">
        <button id="download">Download</button>
        <div id="content">${html}</div>
      </div>
      <script>
      document.getElementById('download').addEventListener('click', function() {
        var element = document.getElementById('content');
        var button = this;
        button.innerText = 'Downloading...';

        html2canvas(element).then(function(canvas) {
            var link = document.createElement('a');
            link.download = '${fileName}.png';
            link.href = canvas.toDataURL("image/png");
            link.click();

            button.innerText = 'Download';
        });
      });
      </script>
    `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
