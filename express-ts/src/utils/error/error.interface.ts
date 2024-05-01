export enum HTTPErrorStatus{
    'BadRequest'=400,
    'Unauthorised'=401,
    'Forbidden'=403,
    'NotFound'=404,
    'InternalServerError'=500
}

export enum HTTPErrorMessage{
    'BadRequest'='BadRequest',
    'Unauthorised'='Unauthorised',
    'Forbidden'='Forbidden',
    'NotFound'= 'NotFound',
    'InternalServerError'='InternalServerError'
}

export default class HttpError extends Error{
    constructor(public status:number,public message: string='Error occured'){
        super()
    }
}

export class Unauthorised extends HttpError{
    constructor(public message: string='Error occured'){
        super(HTTPErrorStatus.Unauthorised,HTTPErrorMessage.Unauthorised)
    }
}

export class Forbidden extends HttpError{
    constructor(public message: string='Error occured'){
        super(HTTPErrorStatus.Forbidden,HTTPErrorMessage.Forbidden)
    }
}
export class NotFound extends HttpError{
    constructor(public message: string='Error occured'){
        super(HTTPErrorStatus.NotFound,HTTPErrorMessage.NotFound)
    }
}

export class InternalServerError extends HttpError{
    constructor(public message: string='Error occured'){
        super(HTTPErrorStatus.InternalServerError,HTTPErrorMessage.InternalServerError)
    }
}