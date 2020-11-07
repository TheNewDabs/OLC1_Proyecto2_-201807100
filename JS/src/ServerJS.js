const app = require('express')();
const body = require('body-parser');
const cors = require('cors');
const Gramatica = require('./gramatica');
const nodo = require('./Nodo');

const port = 2000;

app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(cors());

app.post('/JS', (req, res) =>{
    const Reportes = Gramatica.parse(req.body.Codigo);
    const Traduccion = Reportes.raiz.Identar();
    var retorno={
		raiz:Reportes.raiz,
		Errores: Reportes.Errores,
        Tokens: Reportes.Tokens,
        Traduccion: Traduccion
    };
    res.send(retorno);
});

app.get('/JS', (req, res) =>{
    res.send("Prueba");
});


app.listen(port, () => {
    console.log('Back End Js on port ' + port)
})