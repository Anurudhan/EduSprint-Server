
import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;
export const Service = {
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    USER_SERVICE_URL : process.env.USER_SERVICE_URL || "http://localhost:5002",
    NOTIFICATION_SERVICE_URL:process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5003",
    CLIENT_URL : process.env.CLIENT_URL || "http://localhost:5173"
}
