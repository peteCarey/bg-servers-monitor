var express = require('express');
var app = express();
var path = require('path');

var html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>BG Production Info</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
  <script>
    var displayWindow = null;

    function myFunction() {
        let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width="+screen.availWidth+",height="+screen.availHeight
        displayWindow = window.open("https://dashboard.heroku.com/apps/api-alp-pz/metrics/web?ending=undefined-hours-ago&starting=undefined-hours-ago", "BG-Monitor", params)
        var urlParams = new URLSearchParams(window.location.search);
        var webpages = "${process.env.WEB_PAGES}".split('**');
        var i;
        var intv = 0;
        for (i = 0; i < webpages.length; i++) {
          intv+=30000;
          openPage(webpages[i], intv);
        }
    }

    function openPage(page, interval) {
        setInterval(function() {
            displayWindow.location.href = page;
        }, interval);
    }
</script>

<style>
html,
body {
  height: 100%
}
</style>

</head>
<body>
    <div class="h-100 row align-items-center">
        <div class="col text-center">
            <img src="images/payzone-logo.png">
            <div><a class="btn btn-large btn-outline-danger" href="#Start" onclick="myFunction()">Start Monitoring Servers...</a></div>
        </div>
    </div>
</body>
</html>
`
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send(html)
});

var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
