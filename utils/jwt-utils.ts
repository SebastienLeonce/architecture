import randomString from 'randomstring';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';


// Errors
const errors = {
    validation: 'JSON-web-token validation failed.',
} as const;

// Constants
const secret = (process.env.JWT_SECRET || randomString.generate(100)),
    options = {expiresIn: process.env.COOKIE_EXP || 3600*24};


// Types
type TDecoded = string | JwtPayload | undefined;


export const cookieProps = Object.freeze({
    key: 'jwt',
    secret: process.env.COOKIE_SECRET || randomString.generate(100),
    options: {
        // httpOnly: true,
        signed: true,
        // path: (process.env.COOKIE_PATH || '/'),
        maxAge: Number(process.env.COOKIE_EXP) || 3600*24,
        // domain: (process.env.COOKIE_DOMAIN ||'http://localhost:3000/'),
        // secure: false,
    },
});



/**
 * Encrypt data and return jwt.
 *
 * @param data
 */
function sign(data: JwtPayload): Promise<string> {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(data, secret, options, (err, token) => {
            err ? reject(err) : resolve(token || '');
        });
    });
}


/**
 * Decrypt JWT and extract client data.
 *
 * @param jwt
 */
function decode(jwt: string): Promise<TDecoded> {
    return new Promise((res, rej) => {
        jsonwebtoken.verify(jwt, secret, (err, decoded) => {
            return err ? rej(errors.validation) : res(decoded);
        });
    });
}



// Export default
export default {
    sign,
    decode,
}