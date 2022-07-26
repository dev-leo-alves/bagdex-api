/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

 import { app } from '../../../../app'
 import { prisma } from '../../../../prisma'
 import request from "supertest"

 describe('Get All Tiers (e2e)', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to get all tags', async () => {
   

    await prisma.tier.createMany({
      data: [
        {
          id: 1,
          name: 'Tier 01',
          url: 'https://www.validurl/1'
        },
        {
          id: 2,
          name: 'Tier 02',
          url: 'https://www.validurl/2'
        },
        {
          id: 3,
          name: 'Tier 03',
          url: 'https://www.validurl/3'
        },
      ],
    })
   
    
    const response = await request(app)
    .get('/api/tiers')
    .send()
    console.log(response.status)


    expect(response.status).toBe(200)
   
  })
})