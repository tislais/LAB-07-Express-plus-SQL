/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('Pinball Machines API');
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const user = req.body;
    console.log(req.body);
    const data = await client.query(`
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `, [user.name, user.email, user.passwordHash]);
    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// API routes,
app.get('/api/machines', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  m.id,
              m.title,
              manufacturer,
              date_of_manufacture as "dateOfManufacture",
              units_produced as "unitsProduced",
              abbreviation,
              mpu,
              type,
              designer,
              image,
              manual,
              fun_rating as "funRating",
              is_favorite as "isFavorite",
              user_id as "userId",
              u.name as "userName"
      FROM    machines m
      JOIN    users u
      ON      m.user_id = u.id;
    `);

    // send back the data
    res.json(data.rows); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.get('/api/machines/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  
        m.id,
        m.title,
        manufacturer,
        date_of_manufacture as "dateOfManufacture",
        units_produced as "unitsProduced",
        abbreviation,
        mpu,
        type,
        designer,
        image,
        manual,
        fun_rating as "funRating",
        is_favorite as "isFavorite",
        user_id as "userId",
        u.name as "userName"
      FROM    machines m
      JOIN    users u
      ON      m.user_id = u.id
      WHERE   m.id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.post('/api/machines', async (req, res) => {
  try {
    const machine = req.body;
    console.log(machine);
    const data = await client.query(`
      INSERT INTO machines (title, manufacturer, date_of_manufacture, units_produced, abbreviation, mpu, type, designer, image, manual, fun_rating, is_favorite, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING 
        id,
        title, 
        manufacturer, 
        date_of_manufacture as "dateOfManufacture", 
        units_produced as "unitsProduced", 
        abbreviation, 
        mpu, 
        type, 
        designer, 
        image, 
        manual, 
        fun_rating as "funRating", 
        is_favorite as "isFavorite",
        user_id as "userId";
    `, [machine.title, machine.manufacturer, machine.dateOfManufacture, machine.unitsProduced, machine.abbreviation, machine.mpu, machine.type, machine.designer, machine.image, machine.manual, machine.funRating, machine.isFavorite, machine.userId]);
    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/machines/:id', async (req, res) => {
  try {
    const machine = req.body;
    const data = await client.query(`
      UPDATE machines
      SET title = $1, manufacturer = $2, date_of_manufacture = $3, units_produced = $4, abbreviation = $5, mpu = $6, type = $7, designer = $8, image = $9, manual = $10, fun_rating = $11, is_favorite = $12
      WHERE id = $13
      RETURNING 
        id,
        title, 
        manufacturer, 
        date_of_manufacture as "dateOfManufacture", 
        units_produced as "unitsProduced", 
        abbreviation, 
        mpu, 
        type, 
        designer, 
        image, 
        manual, 
        fun_rating as "funRating", 
        is_favorite as "isFavorite",
        user_id as "userId";
    `, [machine.title, machine.manufacturer, machine.dateOfManufacture, machine.unitsProduced, machine.abbreviation, machine.mpu, machine.type, machine.designer, machine.image, machine.manual, machine.funRating, machine.isFavorite, req.params.id]);

    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/machines/:id', async (req, res) => {
  try {
    const data = await client.query(`
      DELETE FROM machines
      WHERE id = $1
      RETURNING 
        id,
        title, 
        manufacturer, 
        date_of_manufacture as "dateOfManufacture", 
        units_produced as "unitsProduced", 
        abbreviation, 
        mpu, 
        type, 
        designer, 
        image, 
        manual, 
        fun_rating as "funRating", 
        is_favorite as "isFavorite",
        user_id as "userId"; 
    `, [req.params.id]);

    res.json(data.rows[0]);

  } 
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/machines/titles/:title', async (req, res) => {
  // use SQL query to get data...
  try {
    console.log(req.params.title);
    const data = await client.query(`
    SELECT  id,
          title,
          manufacturer,
          date_of_manufacture as "dateOfManufacture",
          units_produced as "unitsProduced",
          abbreviation,
          mpu,
          type,
          designer,
          image,
          manual,
          fun_rating as "funRating",
          is_favorite as "isFavorite",
          user_id as "userId"
      FROM    machines
      WHERE   title = $1;
    `, [req.params.title]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

export default app;