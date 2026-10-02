const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('App Version 1'));
app.get('/health', (req, res) => res.send('OK'));
module.exports = app;
if (require.main === module) app.listen(3000);
