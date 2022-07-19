export type HttpResponse = {
    statusCode: number
    body: any
}

export type HttpErrorResponse = {
    statusCode: number
    body: {
        error: string
    }
}
  

  
