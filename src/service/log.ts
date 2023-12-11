import winston from 'winston';

function twoDigitsNumber(number: number): string {
  if (number < 0) {
    return `-${twoDigitsNumber(-number)}`;
  }

  return number > 9 ? number.toString() : `0${number.toString()}`;
}

function dateLogFormat(date: Date) {
  const year = twoDigitsNumber(date.getFullYear());
  const month = twoDigitsNumber(date.getMonth());
  const day = twoDigitsNumber(date.getDay());
  const hour = twoDigitsNumber(date.getHours());
  const minute = twoDigitsNumber(date.getMinutes());
  const second = twoDigitsNumber(date.getSeconds());
  const miliseconds = twoDigitsNumber(date.getMilliseconds());

  return `${year}/${month}/${day}T${hour}:${minute}:${second}.${miliseconds}`;
}

const logger = winston.createLogger({
  handleExceptions: true,
  transports: new winston.transports.Console({
    format: winston.format.printf((info) => {
      const log = `${dateLogFormat(new Date())} [App] ${info.level} - ${
        info.message
      }`;
      return log;
    }),
  }),
  format:
    process.env.NODE_ENV?.toLowerCase() == 'production'
      ? winston.format.simple()
      : winston.format.combine(
          winston.format.simple(),
          winston.format.colorize()
        ),
  level: process.env.LOG_LEVEL ?? 'info',
});

export default logger;
