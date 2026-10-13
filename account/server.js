const express = require('express');
const app = express();
const TX = process.env.TRANSACTION_URL || 'http://transaction:8080';
app.get('/health', (_, r) => r.json({status: 'ok'}));
app.get('/accounts', (_, r) => r.json([{id: 1, owner: 'Josephine', balance: 1000}]));
app.get('/accounts/transactions', async (_, r) => {
  try { r.json(await (await fetch(TX + '/transactions')).json()); }
  catch (e) { r.status(502).json({error: 'transaction service unreachable'}); }
});
app.listen(3000, () => console.log('account on 3000'));
