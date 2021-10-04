import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import { promisify } from 'util';

// jwt methods are not async compatible !!
// promisify jwt methods using node.js utility promisify
export const signJWT = promisify(sign);
export const verifyJWT = promisify(verify);
