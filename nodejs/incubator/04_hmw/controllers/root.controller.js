
const apiRules = "How to use:</br></br>\n" +
    "(GET)<span>&emsp;</span>/clients - get all clients</br>\n" +
    "(GET)<span>&emsp;</span>/clients/(id) - get client by ID</br>\n" +
    "(POST)<span>&emsp;</span>/clients - add new client</br>\n" +
    "(PUT)<span>&emsp;</span>/clients/(id) - update client by ID</br>\n" +
    "(DELETE)<span>&emsp;</span>/clients/(id) - DELETE client by ID</br>\n";

module.exports = {
    getRules: (req, res) => {
        res.send(apiRules);
    }
};
