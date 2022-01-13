module.exports = {

    NAME_REGEXP: new RegExp(/^[A-z\s'-]{2,20}$/),
    PHONE_REGEXP: new RegExp(/^\+[\d\s()-]{13,19}$/),
    EMAIL_REGEXP: new RegExp(/^[\w-.]+@[[\w-.]+$/),

    MAX_SPACE_SQM: 5_000,

    USER_ROLE:  {
        USER:    'USER',
        MANAGER: 'MANAGER',
        ADMIN:   'ADMIN'
    },

    LOGIN_TYPE: {
        PHONE: 'PHONE',
        PASSWORD: 'PASSWORD'
    },

    TKN: {
        TYPE: {
            ACCESS: 'ACCESS',
            REFRESH: 'REFRESH',
            APPRBOOKING: 'APPRBOOKING'
        },
        SECRET: {
            ACCESS: '1zcSMbzVqF0AiefqZNQ0',
            REFRESH: 'cdCzKUm5PQDjzsy7160Y',
            APPRBOOKING: 'cdCzKUm5PQDjzsy7160Y'
        },
        EXP: {
            ACCESS: '20m',
            REFRESH: '2d',
            APPRBOOKING: '10h'
        }
    }
};
