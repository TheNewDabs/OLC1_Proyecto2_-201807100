var contador=0;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    document.getElementById('ConsolaJS').value = 'ConsolaJS';
    document.getElementById('ConsolaPython').value = 'ConsolaPython';
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','#3a7999');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    document.getElementById('ConsolaJS').value = 'ConsolaJS';
    document.getElementById('ConsolaPython').value = 'ConsolaPython';
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=123;
    ta.rows=30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}


function quitar(){
    try{
        document.getElementById('ConsolaJS').value = 'ConsolaJS';
        document.getElementById('ConsolaPython').value = 'ConsolaPython';
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function Ambos(){
    Javascript();
    Python();
}

function Javascript(){
    let ta=document.getElementById(get_vent());
    let contenido=ta.value
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"Codigo":contenido});
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:2000/JS", requestOptions)
        .then(response => response.text())
        .then(result =>{
            Regreso = JSON.parse(result);
            ReporteTokens("JavaScript", Regreso.Tokens);
            ReporteErrores("JavaScript", Regreso.Errores);
            DescargarReporte("Traduccion_JavaScript", Regreso.Traduccion, "js");
        })
        .catch(error => console.log('error', error));
}

function Python(){
    let ta=document.getElementById(get_vent());
    let contenido=ta.value
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"Codigo":contenido});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:3000/Python", requestOptions)
        .then(response => response.text())
        .then(result =>{
            Regreso = JSON.parse(result)
            ReporteTokens("Python", Regreso.Tokens);
            ReporteErrores("Python", Regreso.Errores);
            DescargarReporte("Traduccion_Python", Regreso.Traduccion, "py");
        })
        .catch(error => console.log('error', error));
}

function ReporteTokens(Lenguaje, Tokens){
    Reporte = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Tokens Java - ` + Lenguaje + `</title>
        </head>
        <body>
            <h1>Tokens Java</h1>
            <h3>Daniel Barillas</h3>
            <table border="1">
                <tr>
                    <th>Tipo</th>
                    <th>Lexema</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;
    for(var i=0; i<Tokens.length ;i++){
        Reporte += `
                <tr>
                    <td>`+Tokens[i].Tipo+`</td>
                    <td>`+Tokens[i].Lexema+`</td>
                    <td>`+Tokens[i].Fila+`</td>
                    <td>`+Tokens[i].Columna+`</td>
                </tr>`;
    }
    Reporte +=`
            </table>
        </body>
    </html>`;
    DescargarReporte("Tokens_" + Lenguaje, Reporte, "html");
}

function ReporteErrores(Lenguaje, Errores){
    if(Lenguaje=="Python"){
        document.getElementById('ConsolaPython').value = 'ConsolaPython\n';
        document.getElementById('ConsolaPython').value += 'Tipo ° Lexema ° Descripcion ° Fila ° Columna';
    }else{
        document.getElementById('ConsolaJS').value = 'ConsolaJS\n';
        document.getElementById('ConsolaJS').value += 'Tipo ° Lexema ° Descripcion ° Fila ° Columna';
    }
    console.log(Lenguaje)
    console.log(Errores)
    Reporte = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Errores Java - ` + Lenguaje + `</title>
        </head>
        <body>
            <h1>Errores Java</h1>
            <h3>Daniel Barillas</h3>
            <table border="1">
                <tr>
                    <th>Tipo</th>
                    <th>Lexema</th>
                    <th>Descripcion</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;
    for(var i=0; i<Errores.length ;i++){
        Reporte += `
                <tr>
                    <td>`+Errores[i].Tipo+`</td>
                    <td>`+Errores[i].Lexema+`</td>
                    <td>`+Errores[i].Descripcion+`</td>
                    <td>`+Errores[i].Fila+`</td>
                    <td>`+Errores[i].Columna+`</td>
                </tr>`;
                if(Lenguaje=="Python"){
                    document.getElementById('ConsolaPython').value += "\n" + Errores[i].Tipo + " ° " + Errores[i].Lexema + " ° " + Errores[i].Descripcion + " ° " + Errores[i].Fila + " ° " + Errores[i].Columna;
                }else{
                    document.getElementById('ConsolaJS').value += "\n" + Errores[i].Tipo + " ° " + Errores[i].Lexema + " ° " + Errores[i].Descripcion + " ° " + Errores[i].Fila + " ° " + Errores[i].Columna;
                }
    }
    Reporte +=`
            </table>
        </body>
    </html>`;
    DescargarReporte("Errores_" + Lenguaje, Reporte, "html");
}

function DescargarReporte(Nombre, Texto, Formato){
    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato="_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre=Nombre+formato + "." + Formato;//nombre del archivo
    var file=new Blob([Texto], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual
    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".java";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}

