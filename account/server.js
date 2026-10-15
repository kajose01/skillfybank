const express = require('express');
const app = express();
const TX = process.env.TRANSACTION_URL || 'http://transaction:8080';
const H = ['x-request-id','x-b3-traceid','x-b3-spanid','x-b3-parentspanid','x-b3-sampled','x-b3-flags','traceparent','tracestate','b3'];
app.get('/health', (_, r) => r.json({status: 'ok'}));
app.get('/accounts', (_, r) => r.json([{id: 1, owner: 'Josephine', balance: 1000}]));
app.get('/accounts/transactions', async (req, r) => {
  const h = {};
  H.forEach(k => { if (req.headers[k]) h[k] = req.headers[k]; });
  try { r.json(await (await fetch(TX + '/transactions', {headers: h})).json()); }
  catch (e) { r.status(502).json({error: 'transaction service unreachable'}); }
});
app.listen(3000, () => console.log('account on 3000'));
