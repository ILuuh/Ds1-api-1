const express = require("express");

const racas = require("./src/services/racasServices")
const especies = require("./src/services/especiesServices")

const Port = 3500;
const app = express();
app.use(express.json());

app.get('/api/racas', (req, res) => { racas.get(req, res) });
app.get('/api/racas/:id', (req, res) => { racas.getByid(req, res) });
app.post('/api/racas', (req, res) => { racas.post(req, res) });
app.put("/api/racas/:id", (req, res) => {
  racas.put(req, res);
});
app.delete("/api/racas/:id", (req, res) => {
  racas.erase(req, res);
});


app.get('/api/especies', (req, res) => { especies.get(req, res) });
app.get('/api/especies/:id', (req, res) => { especies.getByid(req, res) });
app.post('/api/especies', (req, res) => { especies.post(req, res) });
app.put("/api/especies/:id", (req, res) => {
  especies.put(req, res);
});
app.delete("/api/especies/:id", (req, res) => {
  especies.erase(req, res);
});

app.listen(Port, () => { console.log(`servidor rodando na porta: ${Port} !`) });