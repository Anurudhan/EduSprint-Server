import { config } from "dotenv";
config();

export const env_variables = {
    MONGODB_URL :process.env.MONGODB_URL,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    FRONTEND_URL:process.env.FRONTEND_URL,
    USERMAIL:process.env.USERMAIL,
    USERSECRET:process.env.USERSECRET,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    GOOGLE_CLIENT_ID:String(process.env.GOOGLE_CLIENT_ID),
    FORGOT_PASSWORD_SECRET:process.env.FORGOT_PASSWORD_SECRET
}