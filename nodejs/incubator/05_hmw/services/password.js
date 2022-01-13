const cryptoP = require('bcrypt');

module.exports = {
    mkHash: (password) => cryptoP.hash(password, 10),

    isPwdMatch: async (password, hashedPassword) => {
        if (await cryptoP.compare(password, hashedPassword)) {return true;}
    }
};
