const { createLogger, transports, format } = require('winston') //mdoule winston for log

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(5)}] - ${info.message}`
}))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console({ level: 'debug'}),
        new transports.File({ filename: 'app.log', level: 'info'})
    ]
})

module.exports = logger