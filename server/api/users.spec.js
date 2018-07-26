/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const nicosEmail = 'nico@goodcats.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('POST /api/users', async () => {
      const response = await agent.post('/api/users')
        .send({
          email: nicosEmail
        })
        .expect(201);
      const createdUser = await User.findById(response.body.id);
      expect(createdUser.email).to.be.equal(nicosEmail);
    });

    it('PUT /api/users/:userId', async () =>{
      const response = await agent.put('/api/users/1')
        .send({
          email: "codysnewemail@puppybook.com"
        })
        .expect(200);
      const updatedUser = await User.findById(response.body.id);
      expect(updatedUser.email).to.be.equal("codysnewemail@puppybook.com")
    });

  }) // end describe('/api/users')
}) // end describe('User routes')
