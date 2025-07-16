import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function createToken(userId: string) {
    return jwt.sign({userID: userId}, JWT_SECRET, { expiresIn: '1h'});
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}