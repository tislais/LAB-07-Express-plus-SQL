import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  let user;

  beforeAll(async () => {
    execSync('npm run recreate-tables');

    const response = await request
      .post('/api/auth/signup')
      .send({
        name: 'The user',
        email: 'test@example.com',
        passwordHash: 'password'
      });

    expect(response.status).toBe(200);
    user = response.body;
  });

  afterAll(async () => {
    return client.end();
  });

  

  let scaredStiff = {
    id: expect.any(Number),
    title: 'Scared Stiff',
    manufacturer: 'Bally',
    dateOfManufacture: 1996,
    unitsProduced: 4028,
    abbreviation: 'SS',
    mpu: 'WPC-95',
    type: 'Solid State Electronic',
    designer: 'Dennis Nordman, Mark Weyna',
    image: 'https://www.ipdb.org/images/3915/Backglass.jpg',
    manual: 'https://www.ipdb.org/files/3915/Bally_1996_Scared_Stiff_Manual.pdf',
    funRating: 8.3,
    isFavorite: false
  };

  let indianaJones = {
    id: expect.any(Number),
    title: 'Indiana Jones: The Pinball Adventure',
    manufacturer: 'Williams',
    dateOfManufacture: 1993,
    unitsProduced: 12716,
    abbreviation: 'IJ',
    mpu: 'WPC (DCS)',
    type: 'Solid State Electronic',
    designer: 'Mark Ritchie, Brian Eddy, Doug Watson',
    image: 'https://www.ipdb.org/images/1267/image-2.jpg',
    manual: 'https://www.ipdb.org/files/1267/Williams_1993_Indiana_Jones_The_Pinball_Adventure_English_Manual.pdf',
    funRating: 8.3,
    isFavorite: false
  };

  let theAddamsFamily = {
    id: expect.any(Number),
    title: 'The Addams Family',
    manufacturer: 'Bally',
    dateOfManufacture: 1992,
    unitsProduced: 20270,
    abbreviation: 'TAF',
    mpu: 'WPC (Fliptronics 1)',
    type: 'Solid State Electronic',
    designer: 'Pat Lawlor',
    image: 'https://www.ipdb.org/images/20/image-24.jpg',
    manual: 'https://www.ipdb.org/files/20/Bally_1992_The_Addams_Family_Manual.pdf',
    funRating: 8.2,
    isFavorite: false
  };

  it.only('POST a resource', async () => {
    scaredStiff.userId = user.id;
    const response = await request
      .post('/api/machines')
      .send(scaredStiff);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(scaredStiff);

    scaredStiff = response.body;
  });

  it.skip('PUT updated resource to /api/machines/:id', async () => {
    scaredStiff.funRating = 8.4;
    scaredStiff.isFavorite = true;

    const response = await request
      .put(`/api/machines/${scaredStiff.id}`)
      .send(scaredStiff);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(scaredStiff);
  });

  it.skip('GET list of machines from /api/machines', async () => {
    const req1 = await request
      .post('/api/machines')
      .send(indianaJones);
    indianaJones = req1.body;
    const req2 = await request
      .post('/api/machines')
      .send(theAddamsFamily);
    theAddamsFamily = req2.body;

    const response = await request.get('/api/machines');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([scaredStiff, indianaJones, theAddamsFamily]));
  });

  it.skip('GET theAddamsFamily from /api/machines/:id', async () => {
    const response = await request.get(`/api/machines/${theAddamsFamily.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);
  });

  it.skip('GET by title from /api/machines/titles/', async () => {
    const response = await request.get(`/api/machines/titles/${theAddamsFamily.title}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);
  });

  it.skip('DELETE theAddamsFamily from /api/machines/:id', async () => {
    const response = await request.delete(`/api/machines/${theAddamsFamily.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);

    const getResponse = await request.get('/api/machines');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.find(machine => machine.id === theAddamsFamily.id)).toBeUndefined();
  });

});