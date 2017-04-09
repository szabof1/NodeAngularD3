const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    const host = (server.address().address === '::') ? 'localhost' : server.address().address
    console.log(`Node.js server is listening on ${ host }:${ server.address().port }`)
});
