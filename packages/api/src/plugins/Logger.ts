
const { createLogger, transports, format } = require("winston");
const LokiTransport = require("winston-loki");
export const LOGGER = createLogger()

LOGGER.add(new transports.Console({
    format: format.json(),
    level: 'debug'
  }))
  
LOGGER.add(new LokiTransport({
    host: 'http://loki:3300',
    json: true,
    // basicAuth: 'username:password',
    labels: { job: 'winston-loki-example' }
}))

