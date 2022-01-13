module.exports = {
    rmFields: (userObj, fieldArr) => {
        fieldArr.forEach( el => delete userObj[el]);
        return userObj;
    }
};
