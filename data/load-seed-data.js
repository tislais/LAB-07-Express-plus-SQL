/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import machines from './machines.js';

run();

async function run() {

  try {

    await Promise.all(
      machines.map(machine => {
        return client.query(`
          INSERT INTO machines (title, manufacturer, date_of_manufacture, units_produced, abbreviation, mpu, type, designer, image, manual, fun_rating, is_favorite)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
        `,
        [machine.title, machine.manufacturer, machine.dateOfManufacture, machine.unitsProduced, machine.abbreviation, machine.mpu, machine.type, machine.designer, machine.image, machine.manual, machine.funRating, machine.isFavorite]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}