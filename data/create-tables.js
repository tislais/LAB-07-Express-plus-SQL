/* eslint-disable no-console */
import client from '../lib/client.js';

// async/await needs to run in a function
run();

async function run() {

  try {

    // run a query to create tables
    await client.query(`    
      CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(512) NOT NULL,
        email VARCHAR(512) NOT NULL,
        password_hash VARCHAR(512) NOT NULL
      );
    
      CREATE TABLE machines (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(512) NOT NULL,
        manufacturer VARCHAR(512) NOT NULL,
        date_of_manufacture INTEGER NOT NULL,
        units_produced INTEGER NOT NULL,
        abbreviation VARCHAR(512),
        mpu VARCHAR(512),
        type VARCHAR(512) NOT NULL,
        designer VARCHAR(512) NOT NULL,
        image VARCHAR(512) NOT NULL,
        manual VARCHAR(512),
        fun_rating FLOAT NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE,
        user_id INTEGER NOT NULL REFERENCES users(id)
      );
    `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}