import {Request, Response, NextFunction} from 'express'
const appUrlResolver = (req: Request, res: Response, next: NextFunction) => {
    req.appUrl = req.protocol + '://' + req.get('host');
    next()
}

export default appUrlResolver
