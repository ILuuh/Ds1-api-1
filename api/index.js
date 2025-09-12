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
  console.log("Servidor rodando ! ");
});

// criando uma rota
// CRUD == SQL  == API
// Create == Insert == POST
// Read == Select == GET
// Update == Update == PUT
// Delete == Delete  == DELETE

// endpoint 1 - Raças

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

// 3. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/racas/:id", async (req, resp) => {
  const idValue = req.params.id;
  console.log(idValue);

  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute(`SELECT * FROM racas WHERE id = ${idValue}`);
    console.log(rows);
    resp.send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 2.rota  = POST
app.post("/api/racas", async (req, res) => {

  const { raca } = req.body;
  try {
    const connection = await conectar();
    const result = await connection.execute(`INSERT INTO racas (raca) values ( "${raca}")`);
    res.send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }
});

// 3.rota  = PUT
async function put_racas(req, res) {
  const { raca } = req.body;
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`UPDATE racas SET raca = "${raca}" WHERE id = ${id}`);
    res.send(result).status(202);

  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }

}
app.put("/api/racas/:id", (req, res) => put_racas(req, res));

// 4.rota  = DELETE
async function delete_racas(req, res) {
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`DELETE FROM racas WHERE id = ${id}`);
    res.send(result).status(202);

  } catch (error) {

    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }
}
app.delete("/api/racas/:id", (req, res) => {
  delete_racas(req, res);
});


// endpoint 2 - Veterinários

// 1. rota  = GET == select * from == Read
app.get("/api/veterinarios", async (req, resp) => {
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM veterinarios order br id');
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 3. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/veterinarios/:id", async (req, resp) => {
  const idValue = req.params.id;
  console.log(idValue);

  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute(`SELECT * FROM veterinarios WHERE id = ${idValue}`);
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 2.rota  = POST
app.post("/api/veterinarios", async (req, res) => {

  const { nome } = req.body;
  const { telefone } = req.body;
  const { email } = req.body;
  const { crm } = req.body;
  try {
    const connection = await conectar();
    const result = await connection.execute(`INSERT INTO veterinarios (nome, telefone, email, crm) values ( "${nome}", "${telefone}", "${email}", "${crm}")`);
    res.send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }
});

// 3.rota  = PUT
async function put_veterinarios(req, res) {
  const { nome } = req.body;
  const { telefone } = req.body;
  const { email } = req.body;
  const { crm } = req.body;
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`UPDATE veterinarios SET nome = "${nome}", telefone = "${telefone}", email = "${email}", crm = "${crm}" WHERE id = ${id}`);
    res.send(result).status(202);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }

}
app.put("/api/veterinarios/:id", (req, res) => put_veterinarios(req, res));

// 4.rota  = DELETE
async function delete_veterinarios(req, res) {
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`DELETE FROM veterinarios WHERE id = ${id}`);
    res.send(result).status(204);

  } catch (error) {
    res.status(508).send({ 'message': error, 'sucess': false })
  } finally {
    desconectar(connection);
  }


}
app.delete("/api/veterinarios/:id", (req, res) => {
  delete_veterinarios(req, res);
});

//endpoint 2 - Animal

// 1. rota  = GET == select * from == Read
app.get("/api/animais", async (req, resp) => {
  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM animais');
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 3. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/animais/:id", async (req, resp) => {
  const idValue = req.params.id;

  const connection = await conectar();
  try {
    const [rows, fields] = await connection.execute(`SELECT * FROM animais WHERE id = ${idValue}`);
    resp.status(201).send(rows);
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
  } finally {
    desconectar(connection);
  }
});

// 2.rota  = POST
app.post("/api/animais", async (req, res) => {

  const { animal } = req.body;
  const { idade } = req.body;
  const { id_dono } = req.body;
  const { id_raca } = req.body;
  const { id_especie } = req.body;
  try {
    const connection = await conectar();
    const result = await connection.execute(`INSERT INTO animais (animal, idade, id_dono, id_raca, id_especie) values ( "${animal}", "${idade}", "${id_dono}", "${id_raca}", "${id_especie}")`);
    res.send(result);
  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }
});

// 3.rota  = PUT
async function put_animais(req, res) {
  const { animal } = req.body;
  const { idade } = req.body;
  const { id_dono } = req.body;
  const { id_raca } = req.body;
  const { id_especie } = req.body;
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`UPDATE animais SET animal = "${animal}", idade = "${idade}", id_dono = "${id_dono}", crm = "${id_raca}", id_especie = "${id_especie}" WHERE id = ${id}`);
    res.send(result).status(202);

  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })
  } finally {
    desconectar(connection);
  }



}
app.put("/api/animais/:id", (req, res) => put_animais(req, res));

// 4.rota  = DELETE
async function delete_animais(req, res) {
  const id = req.params.id;

  try {
    const connection = await conectar();
    const result = await connection.execute(`DELETE FROM animais WHERE id = ${id}`);
    res.send(result).status(202);

  } catch (error) {
    res.status(401).send({ 'message': error, 'sucess': 'error' })

  } finally {
    desconectar(connection);
  }

}
app.delete("/api/animais/:id", (req, res) => {
  delete_animais(req, res);
});

// CRUD - Espe

const Port = 3500;

const conn = conectar();

app.listen(Port, () => { console.log(`servidor rodando na porta: ${Port} !`) });