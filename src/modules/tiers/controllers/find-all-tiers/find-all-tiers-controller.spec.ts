/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

 import request from 'supertest'
 import { app } from '../../../../app'
 import { prisma } from '../../../../prisma'

 
 describe('Get All Tiers (e2e)', () => {
   afterAll(async () => {
     await prisma.$disconnect()
   })
 
   it('should be able to get all tags', async () => {

 
     await prisma.tier.createMany({
       data: [
          {
            name: 'Tier 01',
            url: 'https://www.validurl/1'
          },
          {
            name: 'Tier 02',
            url: 'https://www.validurl/2'
          },
          {
            name: 'Tier 03',
            url: 'https://www.validurl/3'
          },
        ],
        skipDuplicates: true,
     })
 
     const response = await request(app)
       .get('/api/tiers')
       .send()
 
     expect(response.status).toBe(200)
     expect(response.body).toEqual({
       data: [
         expect.objectContaining({
           id: 1,
           name: 'Tier 01',
           url: 'https://www.validurl/1'
         }),
         expect.objectContaining({
           id: 2,
           name: 'Tier 02',
           url: 'https://www.validurl/2'
         }),
         expect.objectContaining({
           id: 3,
           name: 'Tier 03',
           url: 'https://www.validurl/3'
         }),
       ],
     })
   })
 })