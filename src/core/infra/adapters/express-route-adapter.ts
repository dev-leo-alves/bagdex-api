import { Request, Response } from 'express'

import { Controller } from '../controller'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const {body, params, query} = request

    const httpResponse = await controller.handle({body, params, query})

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
    }
  }
}