import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  log_level: process.env.APP_LOG_LEVEL,
  name: process.env.APP_NAME,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
}));
