import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt, { hash } from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'; 
import {handleSignin} from './controllers/signin.js';
import {handleRegister} from './controllers/register.js';
import {handleProfile} from './controllers/profile.js';
import {handleImage} from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'lianghuang',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    // res.json(db.select('email', 'hash').from('login'));
})

app.post('/signin',(req,res)=>{handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{handleProfile(req,res,db)});

app.put('/image',(req,res)=>{handleImage(req,res,db)})
app.listen(3000,()=>{
    console.log('app is running on port 3000')
})
