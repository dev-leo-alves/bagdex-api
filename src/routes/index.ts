import { Router } from 'express'

import { tiersRouter } from './tier.routes'


const router = Router()

router.use('/api/tiers', tiersRouter)



export { router }