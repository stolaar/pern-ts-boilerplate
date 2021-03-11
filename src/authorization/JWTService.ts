import JWT from 'jsonwebtoken'
import {ILoginResponse} from "../../client/src/interfaces/ILoginResponse.interface";
import keys from "../config/keys";
import jwtDecoder from 'jwt-decode'

export interface IJWTService {
    sign: (payload: any, options?: JWT.SignOptions ) => string,
    generateAuthTokens: (payload: any) => {accessToken: string; refreshToken: string},
    decode: (token: string) => any
}

// TODO: make proper types and move secret
class JWTService implements IJWTService{
    constructor(private jwt: typeof JWT = JWT, private secret: string = keys.jwt.secretOrKey, private jwtDecode: any = jwtDecoder) {}

    sign(payload: any, options: JWT.SignOptions = {expiresIn: keys.jwt.accessToken.expiresIn} ) {
        return this.jwt.sign(payload, this.secret, options)
    }

    // TODO: get sign options from a config file
    generateAuthTokens(payload: any): ILoginResponse {
        const accessToken = this.sign(payload,{expiresIn: "24h"} )
        const refreshToken = this.sign(payload,{expiresIn: "1y"} )

        return {accessToken, refreshToken}
    }

    decode(token: string) {
        return this.jwtDecode(token)
    }

    verify(token: string) {
        return this.jwt.verify(token, this.secret)
    }
}

export default JWTService
