import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Hora extra',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2020-08-19'),
        },
        {
          id: 2,
          amount: -1000,
          title: 'Almoço',
          type: 'withdraw',
          category: 'Alimentação',
          createdAt: new Date('2020-08-19'),
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.db.transactions;
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
