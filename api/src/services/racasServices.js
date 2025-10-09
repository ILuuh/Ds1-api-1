const { conectar, desconectar } = require('../database/config');

const get = async (req, resp) => {

    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM racas order by id desc');
        resp.status(201).send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        desconectar(connection);
    }
}

// 2. rota  = GETbyid == select * from tabela where id = ?id == Read
const getByid = async (req, resp) => {
    const idValue = req.params.id;
    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM racas WHERE id = ${idValue}`);
        resp.send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        desconectar(connection);
    }
}

// 3.rota  = POST
const post = async (req, res) => {
    const { raca } = req.body;
    const connection = await conectar();
    try {
        const result = await connection.execute(`INSERT INTO racas (raca) values ( "${raca}")`);
        res.status(201).send(result);
    } catch (error) {
        res.status(401).send({ 'message': error, 'sucess': 'error' });
    } finally {
        desconectar(connection);
    }
}

// 4.rota  = PUT = UPDATE
async function put(req, res) {
    const { raca } = req.body;
    const id = req.params.id;
    const connection = await conectar();
    try {
        const result = await connection.execute(`UPDATE racas SET raca = "${raca}" WHERE id = ${id}`);
        res.status(202).send(result);
    } catch (error) {
        res.status(401).send({ 'message': error, 'sucess': 'error' });
    } finally {
        desconectar(connection);

    }
}

// 4.rota  = DELETE
const erase = async (req, res) => {
    const id = req.params.id;
    const connection = await conectar();
    try {
        const result = await connection.execute(`DELETE FROM racas WHERE id = ${id}`);
        res.status(204).send(result);
    } catch (error) {
        res.status(508).send({ "message": "Erro executar a solicitação!", sucess: false })
    } finally {
        desconectar(connection);
    }
}


module.exports = { get, getByid, erase, post, put }