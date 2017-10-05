const md5File = require('md5-file/promise');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const alasql = require('alasql');
const _ = require('lodash');
const moment = require('moment');

alasql.fn.moment = moment;
module.exports.md5File = md5File;

module.exports.countLines = function(filePath) {
    return new Promise((resolve, reject) => {
        let count = 0;
        fs.createReadStream(filePath)
            .on('data', function(chunk) {
                for (let i = 0; i < chunk.length; ++i)
                    if (chunk[i] == 10) count++;
            })
            .on('end', function() {
                resolve(count);
            });
    })
}

module.exports.fileStat = function(filePath) {
    const stats = fs.statSync(filePath);
    return stats;
}

module.exports.alasql = async function(sql, params, outputDataPath) {
    const startTime = new Date();
    const results = await alasql.promise(sql, params);
    const hash = crypto.createHash('md5').update(`${sql}-${JSON.stringify(params)}`).digest("hex");
    const resultsPath = path.join(outputDataPath, `latest-results.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(results), 'utf8');
    const executionTime = new Date() - startTime;
    return {
        itemCount: _.size(results),
        executionTime,
        preview: _.slice(results, 0, 500)
    };
};