const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
          rejectUnauthorized: false
      }
    }
});

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: '',
//         database: 'face-db'
//     }
// })

const app = express();
app.use(cors());
app.use(bodyParser.json());

// home route
app.get('/', (request, response) => {
    response.send('success');
})

app.post('/signin', (request, response) => { signin.handleSignin(request, response, db, bcrypt) } );

app.post('/register', (request, response) => { register.handleRegister(request, response, db, bcrypt)});

app.get('/profile/:id', (request, response) => { profile.handleProfile(request, response, db) } )

app.put('/image', (request, response) => { image.handleImage(request, response, db) } );

app.post('/imageurl', (request, response) => { image.handleClarifai(request, response) } );

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})