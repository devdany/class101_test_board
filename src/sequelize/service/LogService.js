const Log = require('../model/Log');
const DateFormat = require('../../lib/DateFormatConverter');

module.exports = {
    createLog: (log) => {
        Log.create({
            ...log,
            create_dt: DateFormat.convertToSave(new Date())
        })
    }
}