import request from 'supertest'
import app from '../../index'
import { prismaClient } from '../../utils/dbconnect'
import { getHash } from '../../utils/pwtoken'

describe('Login API', () => {
  beforeAll(async () => {
    // Set up any necessary test data or environment
    // For example, you can create a test user in the database
    await prismaClient.user.create({
      data: {
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: await getHash('testpassword'),
      },
    })
  })

  afterAll(async () => {
    // Clean up any test data or environment
    // For example, you can delete the test user from the database
    await prismaClient.user.deleteMany()
  })

  describe('POST /login/createuser', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/login/createuser').send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword',
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty(
        'message',
        'User created successfully'
      )
      // You can add more assertions to validate the response data
    })

    it('should return an error if required fields are missing', async () => {
      const response = await request(app).post('/login/createuser').send({
        // Missing required fields
      })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      // You can add more assertions to validate the error response
    })

    // Add more test cases for different scenarios
  })

  describe('POST /login', () => {
    it('should log in a user', async () => {
      const response = await request(app).post('/login').send({
        username: 'testuser',
        password: 'testpassword',
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Login successful')
      // You can add more assertions to validate the response data
    })

    it('should return an error if username or password is incorrect', async () => {
      const response = await request(app).post('/login').send({
        username: 'testuser',
        password: 'wrongpassword',
      })

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('error')
      // You can add more assertions to validate the error response
    })

    // Add more test cases for different scenarios
  })
})
