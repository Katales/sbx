module.exports = {
    getIndByFieldVal: (objArr, fieldNm, value) => {
        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i][fieldNm] === value) {
                return i;
            }
        }
    },

    getNewId: (objArr) => {
        if (!objArr) {return undefined;}
        if (objArr.length === 0) {return 1;}
        let maxId = objArr[0].id;
        for (let i = 1; i < objArr.length; i++) {
            if (objArr[i].id > maxId) {maxId = objArr[i].id;}
        }
        return maxId + 1;
    }
};

