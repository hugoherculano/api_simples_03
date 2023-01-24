const express = require('express');
const app = express();
const rotas = require('./router');


app.use(express.json());
app.use(rotas);


app.listen(8080, () => {
    console.log("Server runirg!")
});