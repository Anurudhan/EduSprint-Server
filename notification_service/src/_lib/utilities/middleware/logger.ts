import  { createLogger, format, transports } from'winston'
const { combine, timestamp, printf } = format;
import 'winston-daily-rotate-file'

// Define the custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance with daily rotation
export const logger = createLogger({
  level: 'info', // Set the default log level
  format: combine(
    timestamp(), // Add timestamp to logs
    logFormat    // Use the custom log format
  ),
  transports: [
    new transports.Console(), // Output logs to the console
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log', // Log file pattern
      datePattern: 'YYYY-MM-DD', // Log rotation pattern (daily)
      maxFiles: '7d', // Retain logs for 7 days
      zippedArchive: true, // Compress old log files
    })
  ]
});