import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret_do_not_use_in_prod';

export const signToken = (payload: object): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};
