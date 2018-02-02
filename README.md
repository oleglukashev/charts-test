# Charts Test


Tech-stack:

  - [AngularJs](https://angularjs.org/)
  - [Webpack](https://webpack.js.org/)
  - ES6
  - [Scss](https://sass-lang.com/)
  - [Bootstrap 4](https://getbootstrap.com/)
  - [D3.js](https://d3js.org/)
  - [C3.js(changed)](http://c3js.org/)
  - [c3-angular-diretives](https://github.com/jettro/c3-angular-directive)

# Features!

  - Draw charts Capacity offload and Concurrent vewiers
  - Zoomable and resizable charts
  - Choose a period or particular dates for checking details information
  - The maximum of the sum of the p2p and the cdn values of the graph.
  - The maximum of the cdn values of the graph
  - A legend with the cdn and p2p values when you hover a point of the graph.
  - A footer to see the graphs as a background and which permits you to zoom on a specific scope of the graph.


### Installation

Install the dependencies and start the server.

```sh
$ npm install
$ npm install babel-loader babel-core webpack
$ npm run dev
```



Check

```sh
http://localhost:8000
```

### Mock-backend.js

You need to add CORS configurations to use this app in mock-backend.js in localhost

```sh
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});
```

### Some tests

```sh
cd charts-test
npm install -g karma-cli
karma start karma.conf.js
```

### Fork

I made a fork of [c3-angular-diretives](https://github.com/jettro/c3-angular-directive) for c3.js library and fixxed there some buges and added new functional.

[link](https://github.com/oleglukashev/c3-angular-directive/commit/0784a7d1010e4921f8a262852bbd120dd6299970)

### Author

email: incognitorus@gmail.com

License
----

MIT


**Free Software, Hell Yeah!**
