import { decode, sign, verify } from 'jsonwebtoken';

const issuer =
  process.env.NODE_ENV === 'production'
    ? 'https://zeldaplay.herokuapp.com'
    : 'http://localhost:4000';

export function signToken(options: any) {
  const signOptions = {
    issuer,
    subject: options.id,
    audience: options.url,
    expiresIn: '12h',
    algorithm: 'RS256'
  };
  return sign({}, process.env.RSA_SECRET, signOptions);
}

export function verifyToken(token: any, options: any) {
  const verifyOptions = {
    issuer,
    subject: options.id,
    audience: options.url,
    expiresIn: '12h',
    algorithm: ['RS256']
  };
  return verify(token, process.env.RSA_PUBLIC, verifyOptions);
}
