import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: process.env.LOGSTASH_LOG_LEVEL,
  prefix: process.env.LOGSTASH_PREFIX,
  url: process.env.LOGSTASH_URL,
}));
