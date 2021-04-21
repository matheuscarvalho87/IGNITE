import React from 'react';
import ReactDOM from 'react-dom';
import {createServer} from 'miragejs'
import { App } from './App';
import { Model } from 'miragejs';

createServer({
  models:{
    transaction: Model,
  },
  //Inicia db com alguns dados
  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id:1,
          title:'Frelancer de web',
          type:'deposit',
          category:'Dev',
          amount:6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id:2,
          title:'Futebol',
          type:'withdraw',
          category:'Lazer',
          amount:100,
          createdAt: new Date('2021-03-08 09:00:00')
        },
        {
          id:3,
          title:'Frelancer de web',
          type:'deposit',
          category:'Dev',
          amount:3000,
          createdAt: new Date('2021-04-10 09:00:00')
        },

      ]
    })
  },
  routes(){
    this.namespace ='api';

    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })

    this.post('/transactions',(schema,request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction',data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

