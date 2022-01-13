
const apiRules = "How to use:</br></br>" +
    "(GET)<span>&emsp;</span>/clients - get all clients</br>" +
    "(GET)<span>&emsp;</span>/clients/(id) - get client by ID</br>" +
    "(POST)<span>&emsp;</span>/clients - add new client</br>" +
    "(PUT)<span>&emsp;</span>/clients/(id) - update client by ID</br>" +
    "(DELETE)<span>&emsp;</span>/clients/(id) - DELETE client by ID</br>";

module.exports = {
    getRules: (req, res) => {
        res.send(apiRules);
    }
};
