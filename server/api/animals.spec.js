const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Animal = db.model('animal')

describe('Animal routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/animals/', () => {
    const species = 'Cat';
    const description = "A lovely cat";
    const price = 6500;
    const imageUrl = 'https://www.petcentric.com/media/356965/01_cathello.jpg?width=500&height=301.025390625';

    beforeEach(() => {
      return Animal.create({
        species,
        description,
        price,
        imageUrl
      })
    })

    it('GET /api/animals', async () => {
      const res = await request(app)
        .get('/api/animals')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(description)
    })
  }) // end describe('/api/animals')
}) // end describe('Animal routes')