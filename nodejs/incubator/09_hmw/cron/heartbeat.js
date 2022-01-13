const cron = require("node-cron");

module.exports =
cron.schedule('*/5 * * * * *',
    () => {
        // eslint-disable-next-line no-console
        console.log('>> (cron task) "5s heartbeat" started >>');
    },
    {scheduled: false}

);
