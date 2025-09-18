const express = require("express");
const mysql = require("mysql2/promise");

const stringConnection = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinica_veterinaria',
  port: 3306
};

async function conectar() {
  const connection = await mysql.createConnection(
    stringConnection
  );
  return connection;
}

async function desconectar(connection) {
  connection.end();
}
// exemplo
async function consultarDados() {
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM sua_tabela');
    console.log(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    connection.end();
  }
}

const app = express();
app.use(express.json());

app.get("/", () => {
  console.log("servidor rodando! ");
});

// criando uma rota
// CRUD == SQL  == API'
// Create == Insert == POST
// Read == Select == GET
// Update == Update == PUT
// Delete == Delete  == DELETE

// endpoint 1 - racas
// 1. rota  = GET == select * from == Read
app.get("/api/racas", async (req, resp) => {
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM racas order by id desc');
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 2. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/racas/:id", async (req, resp) => {
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
});

// 3.rota  = POST
app.post("/api/racas", async (req, res) => {
  const { raca } = req.body;
  try {
    const connection = await conectar();
    const result = await connection.execute(`INSERT INTO racas (raca) values ( "${raca}")`);
    res.status(201).send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' });
  } finally {
    desconectar(connection);
  }
});

// 4.rota  = PUT = UPDATE
async function put_racas(req, res) {
  const { raca } = req.body;
  const id = req.params.id;
  try {
    const connection = await conectar();
    const result = await connection.execute(`UPDATE racas SET raca = "${raca}" WHERE id = ${id}`);
    res.status(202).send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' });
  } finally {
    desconectar(connection);

  }
}
app.put("/api/racas/:id", (req, res) => put_racas(req, res));

// 4.rota  = DELETE
const delete_racas = async (req, res) => {
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
app.delete("/api/racas/:id", (req, res) => {
  delete_racas(req, res);
});

// end-point 2 - especies

// 1. rota  = GET == select * from == Read
app.get("/api/especies", async (req, resp) => {
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM especies order by id desc');
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 2. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/especies/:id", async (req, resp) => {
  const idValue = req.params.id;
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute(`SELECT * FROM especies WHERE id = ${idValue}`);
    resp.send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 3.rota  = POST
app.post("/api/especies", async (req, res) => {
  const { especie } = req.body;
  try {
    const connection = await conectar();
    const result = await connection.execute(`INSERT INTO especies (especie) values ( "${especie}")`);
    res.status(201).send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' });
  } finally {
    desconectar(connection);
  }
});

// 4.rota  = PUT = UPDATE
async function put_especies(req, res) {
  const { especie } = req.body;
  const id = req.params.id;
  try {
    const connection = await conectar();
    const result = await connection.execute(`UPDATE especies SET especie = "${especie}" WHERE id = ${id}`);
    res.status(202).send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' });
  } finally {
    desconectar(connection);

  }
}
app.put("/api/especies/:id", (req, res) => put_especies(req, res));

// 4.rota  = DELETE
const delete_especies = async (req, res) => {
  const id = req.params.id;
  const connection = await conectar();
  try {
    const result = await connection.execute(`DELETE FROM especies WHERE id = ${id}`);
    res.status(204).send(result);
  } catch (error) {
    res.status(508).send({ "message": "Erro executar a solicitação!", sucess: false })
  } finally {
    desconectar(connection);
  }
}
app.delete("/api/especies/:id", (req, res) => {
  delete_especies(req, res);
});


const Port = 3500;
const conn = conectar();

app.listen(Port, () => { console.log(`servidor rodando na porta: ${Port} !`) });