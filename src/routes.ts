import express from 'express';
import { PrismaTiersRepository } from './application/repositories/prisma/PrismaTiersRepository';
import { CreateTier } from './application/useCases/createTier/CreateTier';

export const routes = express.Router();

routes.post('/api/v1/tier', async (req, res) => {
    const { name, url } = req.body;

    const prismaFeedbacksRepository = new PrismaTiersRepository()

    const createTier = new CreateTier(
        prismaFeedbacksRepository,
    )

    await createTier.execute({
        name, 
        url
    })

    return res.status(201).send();
})  