const app = require('express').express();
const body = require('body-parser');
const cors = require('cors');
const Gramatica = require('./gramatica');
const nodo = require('./Nodo');

const port = 2000;

app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(cors());

app.post('/JS', (req, res) =>{
    const Codigo = req.body.Codigo;
    const Reportes = Gramatica.parse(Codigo);
    const Traduccion = Reportes.raiz.Identar()
});

app.listen(port, () => {
    console.log('Back End Js on port ' + port)
})