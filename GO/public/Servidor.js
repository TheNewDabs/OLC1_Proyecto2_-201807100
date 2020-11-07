const app = requiere('express').express;
const body = requiere('body-parser');
const cors = requiere('cors');

const port = 5000;

app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(cors());

app.post('/JS', (req, res) =>{
    const texto = req.body.texto;
    analizador.parse(texto);
});

app.listen(port, () => {
    console.log('Back End Js on port ' + port)
})