/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const httpProxy = require('http-proxy');

// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

const firebase = require("firebase");


if (isDeveloping) {
  firebase.initializeApp({
    serviceAccount: "./impactLibrary-8280a55ce533.json",
    databaseURL: "https://impactlibrary-ce58b.firebaseio.com/"
  });

  const db = firebase.database();


  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

  app.all('/db/*', function (req, res) {
    console.log(proxy);

    var ref = db.ref("checkoutBooks");
    ref.push({
      name: "Tony Parker",
      isbn: "1"
    });

      ref.push({
      name: "Manu Ginobili",
      isbn: "2"
    });
   

    res.write('proxy');
    res.end();
  });


  app.get('/list', function response(req, res) {
    var ref = db.ref("checkoutBooks");
    ref.on("value", function(snapshot){
      console.log(snapshot.val());
      res.write(JSON.stringify(snapshot.val()));
      res.end();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

    
  })
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
