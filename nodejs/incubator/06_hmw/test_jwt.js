const tknSrv = require('./services/token.services');
const {TKN} = require('./conf/constants');

/* eslint-disable no-console */
const {accToken, rfrToken} = tknSrv.genTokenPair();
console.log('access token:', accToken, 'refresh token:', rfrToken);
console.log('access token verified:', tknSrv.verifyToken(accToken, TKN.TYPE.ACCESS));
console.log('access token verified:', tknSrv.verifyToken(rfrToken, TKN.TYPE.REFRESH));
