import { registerAs } from '@nestjs/config';

export default registerAs('integrations', () => ({
  database_gateway_api: process.env.DATABASE_API_URL,
}));
