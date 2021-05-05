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

// API routes,
app.get('/api/machines', async (req, res) => {
  // use SQL query to get data...
  try {
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
              is_favorite as "isFavorite"
      FROM    machines;
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
          is_favorite as "isFavorite"
      FROM    machines
      WHERE   id = $1;
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
    console.log(req.body);
    const data = await client.query(`
      INSERT INTO machines (title, manufacturer, date_of_manufacture, units_produced, abbreviation, mpu, type, designer, image, manual, fun_rating, is_favorite)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
        is_favorite as "isFavorite";
    `, [machine.title, machine.manufacturer, machine.dateOfManufacture, machine.unitsProduced, machine.abbreviation, machine.mpu, machine.type, machine.designer, machine.image, machine.manual, machine.funRating, machine.isFavorite]);

    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default app;