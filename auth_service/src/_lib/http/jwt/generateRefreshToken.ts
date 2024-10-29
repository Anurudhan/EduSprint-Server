import { UserPayload } from "./IUserPayload";
import jwt from "jsonwebtoken"

export const generateRefreshToken = (
    payload: UserPayload
) => {
    return jwt.sign(
        payload,
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '15d' }
    );
};