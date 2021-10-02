import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import { promisify } from 'util';

export const signJWT = promisify(sign);
export const verifyJWT = promisify(verify);

export const verifyAdmin = (req, res, next) => {};

export const verifyLogin = (req, res, next) => {};

export const verifyIsUserOrAdmin = (req, res, next) => {};
