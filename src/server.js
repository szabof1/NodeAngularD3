const path = require('path');
const express = require('express');
const app = express();

const routes = require('./routes');

app.use(routes);

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    const host = (server.address().address === '::') ? 'localhost' : server.address().address
    console.log(`Node.js server is listening on ${ host }:${ server.address().port }`)
});
