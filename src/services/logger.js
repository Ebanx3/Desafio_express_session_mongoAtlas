import log4js from "log4js";

// log4js.configure(
//     {
//         appenders: {
//             fileAppenderInfo: { type: 'file', filename: './logs/info.log' },
//             fileAppenderWarn: { type: 'file', filename: './logs/warns.log' },
//             fileAppenderError: { type: 'file', filename: './logs/error.log' },
//             consola: {type:'console'}
//         },
//         categories: {
//             default: { appenders: ['fileAppenderInfo','consola'], level: 'info' },
//             warns: { appenders: ['fileAppenderWarn','consola'], level: 'warn' },
//             errors: { appender: ['fileAppenderError','consola'], level: 'error' }
//         }
//     }
// )

log4js.configure({
    appenders: {
      multi: {
        type: "multiFile",
        base: "logs/",
        property: "categoryName",
        extension: ".log",
      },
    },
    categories: {
      default: { appenders: ["multi"], level: "info" },
    },
  });

export const middlewareLogger = (req, res, next) => {
    const logger = log4js.getLogger('info');
    logger.info(`Info request: endpoint --> (${req.url}) , method --> (${req.method}) `)
    next();
}

export const middlewareUndefinedPath = (req, res, next) => {
    const logger = log4js.getLogger('warns');
    logger.warn(`Undefined path, endpoint --> (${req.url}) , method --> (${req.method})`)
    res.status(404).send('Undefined path');
}

export const middlewareErrorLogger = (err) => {
    const logger = log4js.getLogger('errors');
    logger.error(`Error: ${err.message}`);
}