import express from 'express'

import { adaptRoute } from '../core/infra/adapters/express-route-adapter'

import { makeCreateTierController } from '../modules/tiers/factories/create-tier-controller-factory'
import { makeFindAllTiersController } from '../modules/tiers/factories/find-all-tiers-controller-factory'
const tiersRouter = express.Router()


tiersRouter.post('/', adaptRoute(makeCreateTierController()))
tiersRouter.get('/', adaptRoute(makeFindAllTiersController()))


export { tiersRouter }