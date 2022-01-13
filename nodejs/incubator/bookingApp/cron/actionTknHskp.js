const cron = require("node-cron");

module.exports =
cron.schedule('15 * * * *',
    () => {
        // eslint-disable-next-line no-console
        console.log('>> (cron task) "actionTkn housekeeping" started >>');
    },
    {scheduled: false}
);

