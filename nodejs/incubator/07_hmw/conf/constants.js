module.exports = {
    MONGO_CONNECT_URL: 'mongodb://localhost:27017/Ndjs-04',
    APP_PORT: 5000,

    userdom:  {
        INTERNAL: 'INTERNAL',
        RETAIL: 'RETAIL',
        B2B: 'B2B'
    },

    NAME_REGEXP: new RegExp(/^[A-z-']{2,20}$/),
    EMAIL_REGEXP: new RegExp(/^[\w-.]+@[[\w-.]+$/),
    PASSWORD_REGEXP: new RegExp(/^[!-~]{6,20}$/),

    TKN: {
        TYPE: {
            ACCESS: 'ACCESS',
            REFRESH: 'REFRESH',
            PASSWORD: 'PASSWORD'
        },
        SECRET: {
            ACCESS: 'AsDf',
            REFRESH: 'qWeR',
            PASSWORD: 'zXcV'
        },
        EXP: {
            ACCESS: '20m',
            REFRESH: '2d',
            PASSWORD: '4h'
        }
    }
};
