import * as winston from 'winston'
import { WinstonModuleOptions } from 'nest-winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Dhaka',
  })

const transport: DailyRotateFile = new DailyRotateFile({
  filename: `logs/app-%DATE%.log`,
  datePattern: 'DD-MM-YYYY', // 'YYYY-MM-DD-HH'
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
})

// transport.on('rotate', function(oldFilename, newFilename) {
//   // do something fun
// });

const options = {
  file: {
    // level: 'info',
    filename: `logs/app.log`,
    // handleExceptions: true,
    json: true,
    // maxsize: 5242880, // 5MB
    // maxFiles: 1,
    // colorize: false
  },
  fileInfo: {
    level: 'info',
    filename: `logs/info.log`,
    // handleExceptions: true,
    json: true,
    // maxsize: 5242880, // 5MB
    // maxFiles: 1,
    // colorize: false
  },
  fileError: {
    level: 'error',
    filename: `logs/errors.log`,
    // handleExceptions: true,
    json: true,
    // maxsize: 5242880, // 5MB
    // maxFiles: 1,
    // colorize: false
  },

  console: {
    level: 'debug',
    // handleExceptions: true,
    // json: false,
    // colorize: true,
    // format: winston.format.combine(
    //   winston.format.timestamp(),
    //   winston.format.ms(),
    //   nestWinstonModuleUtilities.format.nestLike(
    //     'Inventory', { prettyPrint: true }
    //   ),
    // ),
  },
  exception: {
    filename: `logs/exceptions.log`,
  },
  rejection: {
    filename: `logs/rejections.log`,
  },
}

const winConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
  },
}

export const winstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError),
    transport,
  ],
  exceptionHandlers: [new winston.transports.File(options.exception)],
  // rejectionHandlers: [
  //   new winston.transports.File(options.rejection)
  // ],
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.json(),
    winston.format.ms(),
    // winston.format.simple(),
    // winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    nestWinstonModuleUtilities.format.nestLike('Inventory', { prettyPrint: true }),
  ),
  exitOnError: false,
}
