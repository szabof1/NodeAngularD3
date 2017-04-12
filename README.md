# Simple AngularJS App Showing a D3 Graph
This is a very simple AngularJS v1.5 app that shows correlations of countries where movies were made in a cooproduction of different countries. (Data are extracted from the International Movie Database, IMDB.) You can filter the data by year of production.
Filtered data are visualized in a D3 graph.
The data are stored in a Postgres database and served by a Node.js-Express.js backend using Sequelize ORM.

## Installation:
- [install PostgeSQL]
- [install Node.js]
- npm install
- node_modules/.bin/sequelize db:migrate
- node_modules/.bin/sequelize db:seed:all
- npm start
- open app in browser: http://localhost:3000