const express = require("express");

const app = express();

app.use(express.json());

// rota teste
app.get("/", (request, response) => {
response.send({ message: "servidor rodando ..."});
})

app.listen(3000, () => {
console.log("servidor rodando na porta: 3000");
})
