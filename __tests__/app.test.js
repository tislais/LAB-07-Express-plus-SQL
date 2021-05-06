import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  // beforeAll(() => {
  //   execSync('npm run setup-db');
  // });

  beforeAll(() => {
    execSync('npm run recreate-tables');
  });

  afterAll(async () => {
    return client.end();
  });

  // const expectedMachines = [
  //   {
  //     id: expect.any(Number),
  //     title: 'Twilight Zone',
  //     manufacturer: 'Bally',
  //     dateOfManufacture: 1993,
  //     unitsProduced: 15235,
  //     abbreviation: null,
  //     mpu: 'WPC (Fliptronics 2)',
  //     type: 'Solid State Electronic',
  //     designer: 'Pat Lawlor',
  //     image: 'https://www.ipdb.org/images/2684/image-3.jpg',
  //     manual: 'https://www.ipdb.org/files/2684/Bally_1993_Twilight_Zone_Operator_Handbook.pdf',
  //     funRating: 8.4,
  //     isFavorite: true
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Star Trek: The Next Generation',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1993,
  //     unitsProduced: 11728,
  //     abbreviation: 'STTNG',
  //     mpu: 'WPC (DCS)',
  //     type: 'Solid State Electronic',
  //     designer: 'Steve Ritchie',
  //     image: 'https://www.ipdb.org/images/2357/image-2.jpg',
  //     manual: 'https://www.ipdb.org/files/2357/Williams_1993_Star_Trek_The_Next_Generation_Operations_Manual_with_OCR.pdf',
  //     funRating: 8.3,
  //     isFavorite: true
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Theatre of Magic',
  //     manufacturer: 'Bally',
  //     dateOfManufacture: 1995,
  //     unitsProduced: 6600,
  //     abbreviation: 'ToM',
  //     mpu: 'WPC Security',
  //     type: 'Solid State Electronic',
  //     designer: 'John Popadiuk',
  //     image: 'https://www.ipdb.org/images/2845/image-2.jpg',
  //     manual: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Manual.pdf',
  //     funRating: 8.3,
  //     isFavorite: true
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Medieval Madness',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1997,
  //     unitsProduced: 4016,
  //     abbreviation: 'MM',
  //     mpu: 'WPC-95',
  //     type: 'Solid State Electronic',
  //     designer: 'Brian Eddy',
  //     image: 'https://www.ipdb.org/images/4032/image-1.jpg',
  //     manual: 'https://www.ipdb.org/files/4032/Williams_1997_Medieval_Madness_English_Manual.pdf',
  //     funRating: 8.3,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Scared Stiff',
  //     manufacturer: 'Bally',
  //     dateOfManufacture: 1996,
  //     unitsProduced: 4028,
  //     abbreviation: 'SS',
  //     mpu: 'WPC-95',
  //     type: 'Solid State Electronic',
  //     designer: 'Dennis Nordman, Mark Weyna',
  //     image: 'https://www.ipdb.org/images/3915/Backglass.jpg',
  //     manual: 'https://www.ipdb.org/files/3915/Bally_1996_Scared_Stiff_Manual.pdf',
  //     funRating: 8.3,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Indiana Jones: The Pinball Adventure',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1993,
  //     unitsProduced: 12716,
  //     abbreviation: 'IJ',
  //     mpu: 'WPC (DCS)',
  //     type: 'Solid State Electronic',
  //     designer: 'Mark Ritchie, Brian Eddy, Doug Watson',
  //     image: 'https://www.ipdb.org/images/1267/image-2.jpg',
  //     manual: 'https://www.ipdb.org/files/1267/Williams_1993_Indiana_Jones_The_Pinball_Adventure_English_Manual.pdf',
  //     funRating: 8.3,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'The Addams Family',
  //     manufacturer: 'Bally',
  //     dateOfManufacture: 1992,
  //     unitsProduced: 20270,
  //     abbreviation: 'TAF',
  //     mpu: 'WPC (Fliptronics 1)',
  //     type: 'Solid State Electronic',
  //     designer: 'Pat Lawlor',
  //     image: 'https://www.ipdb.org/images/20/image-24.jpg',
  //     manual: 'https://www.ipdb.org/files/20/Bally_1992_The_Addams_Family_Manual.pdf',
  //     funRating: 8.2,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Monster Bash',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1998,
  //     unitsProduced: 3361,
  //     abbreviation: 'MB',
  //     mpu: 'WPC-95',
  //     type: 'Solid State Electronic',
  //     designer: 'George Gomez',
  //     image: 'https://www.ipdb.org/images/4441/image-1.jpg',
  //     manual: 'https://www.ipdb.org/files/4441/Williams_1998_Monster_Bash_Operations_Manual_with_schematics_OCR_searchable.pdf',
  //     funRating: 8.2,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'White Water',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1993,
  //     unitsProduced: 7008,
  //     abbreviation: 'WW',
  //     mpu: 'WPC (Fliptronics 2)',
  //     type: 'Solid State Electronic',
  //     designer: 'Dennis Nordman',
  //     image: 'https://www.ipdb.org/images/2768/image-3.jpg',
  //     manual: 'https://www.ipdb.org/files/2768/Williams_1993_White_Water_English_Manual.pdf',
  //     funRating: 8.2,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Tales of the Arabian Nights',
  //     manufacturer: 'Williams',
  //     dateOfManufacture: 1996,
  //     unitsProduced: 3128,
  //     abbreviation: 'ToTAN',
  //     mpu: 'WPC-95',
  //     type: 'Solid State Electronic',
  //     designer: 'John Popadiuk',
  //     image: 'https://www.ipdb.org/images/3824/Backglass.jpg',
  //     manual: 'https://www.ipdb.org/files/3824/Williams_1996_Tales_of_the_Arabian_Nights_Manual.pdf',
  //     funRating: 8.2,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Sittin Pretty',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1958,
  //     unitsProduced: 1050,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Wayne Neyens',
  //     image: 'https://www.ipdb.org/images/2164/Backglass.jpg',
  //     manual: null,
  //     funRating: 8.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'World Series',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1972,
  //     unitsProduced: 775,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ed Krynski',
  //     image: 'https://www.ipdb.org/images/2813/Backglass.jpg',
  //     manual: null,
  //     funRating: 8.1,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Royal Flush',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1976,
  //     unitsProduced: 12250,
  //     abbreviation: 'RF',
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ed Krynski',
  //     image: 'https://www.ipdb.org/images/2035/Backglass2.jpg',
  //     manual: null,
  //     funRating: 7.9,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Melody',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1967,
  //     unitsProduced: 550,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ed Krynski',
  //     image: 'https://www.ipdb.org/images/1566/image-7.jpg',
  //     manual: null,
  //     funRating: 7.9,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Jacks Open',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1977,
  //     unitsProduced: 2975,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ed Krynski',
  //     image: 'https://www.ipdb.org/images/1281/Backglass2.gif',
  //     manual: null,
  //     funRating: 7.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Jet Spin',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1977,
  //     unitsProduced: 4761,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ed Krynski',
  //     image: 'https://www.ipdb.org/images/1290/image-1.jpg',
  //     manual: null,
  //     funRating: 7.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Sky Line',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1965,
  //     unitsProduced: 2000,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Wayne Neyens',
  //     image: 'https://www.ipdb.org/images/3240/image-26.jpg',
  //     manual: null,
  //     funRating: 7.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Centigrade 37',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1977,
  //     unitsProduced: 1600,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Allen Edwall',
  //     image: 'https://www.ipdb.org/images/480/image-7.jpg',
  //     manual: null,
  //     funRating: 7.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Fireball',
  //     manufacturer: 'Bally',
  //     dateOfManufacture: 1971,
  //     unitsProduced: 3815,
  //     abbreviation: 'FB',
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: 'Ted Zale',
  //     image: 'https://www.ipdb.org/images/852/image-1.jpg',
  //     manual: 'https://www.ipdb.org/files/852/Bally_1972_Fireball_Schematic_Diagram_continuous.pdf',
  //     funRating: 7.8,
  //     isFavorite: false
  //   },
  //   {
  //     id: expect.any(Number),
  //     title: 'Fun Land',
  //     manufacturer: 'Gottlieb',
  //     dateOfManufacture: 1968,
  //     unitsProduced: 3100,
  //     abbreviation: null,
  //     mpu: null,
  //     type: 'Electro-mechanical',
  //     designer: '\tEd Krynski',
  //     image: 'https://www.ipdb.org/images/973/image-3.jpg',
  //     manual: null,
  //     funRating: 7.8,
  //     isFavorite: false
  //   }
  // ];

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  // it('GET /api/machines', async () => {
  //   // act - make the request
  //   const response = await request.get('/api/machines');

  //   // was response OK (200)?
  //   expect(response.status).toBe(200);

  //   // did it return the data we expected?
  //   expect(response.body).toEqual(expectedMachines);

  // });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  // it('GET /api/machines/:id', async () => {
  //   const response = await request.get('/api/machines/2');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expectedMachines[1]);
  // }); 

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

  it('POST a resource', async () => {
    const response = await request.post('/api/machines').send(scaredStiff);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(scaredStiff);

    scaredStiff = response.body;
  });

  it('PUT updated resource to /api/machines/:id', async () => {
    scaredStiff.funRating = 8.4;
    scaredStiff.isFavorite = true;

    const response = await request
      .put(`/api/machines/${scaredStiff.id}`)
      .send(scaredStiff);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(scaredStiff);
  });

  it('GET list of machines from /api/machines', async () => {
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

  it('GET theAddamsFamily from /api/machines/:id', async () => {
    const response = await request.get(`/api/machines/${theAddamsFamily.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);
  });

  it('GET by title from /api/machines/titles/', async () => {
    const response = await request.get(`/api/machines/titles/${theAddamsFamily.title}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);
  });

  it('DELETE theAddamsFamily from /api/machines/:id', async () => {
    const response = await request.delete(`/api/machines/${theAddamsFamily.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(theAddamsFamily);
  });

});