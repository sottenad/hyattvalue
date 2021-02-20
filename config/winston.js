const { createLogger, format, transports } = require('winston');
const { inspect } = require('util');
const chalk = require('chalk');
const hasAnsi = require('has-ansi');

let level, silent;
switch (process.env.NODE_ENV) {
  // case "production":
  //   level = "warning";
  //   silent = false;
  //   break;
  case "test":
    level = "emerg";
    silent = true;
    break;
  default:
    level = "debug";
    silent = false;
    break;
}

function isPrimitive(val) {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
}
function formatWithInspect(val) {
  const prefix = isPrimitive(val) ? '' : '\n';
  const shouldFormat = typeof val !== 'string' || !hasAnsi(val);

  return prefix + (shouldFormat ? inspect(val, { depth: null, colors: true }) : val);
}

const logger = createLogger({
  level,
  silent,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.colorize(),
    format.printf(info => {
      const msg = formatWithInspect(info.message);
      const splatArgs = info[Symbol.for('splat')] || [];
      const rest = splatArgs.map(data => formatWithInspect(data)).join(' ');

      return `${info.timestamp} - ${info.level}: ${msg} ${rest}`;
    })
  ),
  transports: [new transports.Console()]
});

module.exports = logger;