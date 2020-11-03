const app = require('./app');

class Token {
    constructor(Tipo, Lexema, Fila, Columna) {
      this.Tipo = Tipo;
      this.Lexema = Lexema;
      this.Fila = Fila
      this.Columna = Columna
    }
}

class Error {
    constructor(Tipo, Lexema, Descripcion, Fila, Columna) {
      this.Tipo = Tipo;
      this.Lexema = Lexema;
      this.Descripcion = Descripcion
      this.Fila = Fila
      this.Columna = Columna
    }
}

class Nodo{
    constructor(Nombre){
        this.Nombre = Nombre;
        this.Hijos = Array();
        this.Traducir = true;
    }

    NoTraducir(){
        this.Traducir = false;
        for(var i=0; i<this.Hijos.length ;i++){
            Hijos[i].NoTraducir();            
        }
    }

    Agregar(Nuevo){
        this.Hijos.push(Nuevo);
    }
}

let Tokens = Array()
let Errores = Array()
let Raiz = null;
let ContT = 0;

function Cod(){
    return `
    public class Hola{
        int x = Quetal(3, 9+3, -2, Hola(x+(3*3)));     
        public static void main(String[] args){
            int t,y,u;
        }
    }

    public interface Hola2{
        int x = Quetal(3, 9+3, -2, Hola(x+(3*3)));     
        int x,y,z;
        boolean XD = false;
    }
`;
}

async function Main(){
    await app.listen(3000);
    console.log('Server on port 300');
    Analizador();
}

function Analizador(){
    Tokens = Array()
    Errores = Array()
    Raiz = null;
    ContT = 0;
    AnalizadorLexico(Cod());
    AnalizadorSintactico();
    console.log("FIN");
}

function isEqual(str1, str2)
{
    return str1.toUpperCase() === str2.toUpperCase()
}

function IsLetra(Cadena){
    Letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    for(var i=0; i<Letras.length; i++){
        if (isEqual(Cadena, Letras[i])){
            return true;
        }
    }
    return false;
}

function IsNumero(Cadena){
    Digitos = ["0","1","2","3","4","5","6","7","8","9"];
    for(var i=0; i<Digitos.length; i++){
        if (isEqual(Cadena, Digitos[i])){
            return true;
        }
    }
    return false;
}

function AnalizadorLexico(Codigo){
    Codigo+=" "
    Estado = 0;
    Inicio = 0;
    Fila = 1;
    Columna = 1;
    ColumnaI = 1;
    FilaI = 1;
    Cont = 0;
    while (Cont < Codigo.length){
        switch(Estado){
            case 0:
                if ((Codigo[Cont] == ' ') || (Codigo[Cont] == '\t')){
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "\n"){
                    Cont++;
                    Columna = 1;
                    Fila++;
                }else if(IsLetra(Codigo[Cont])){
                    Estado = 1;
                    Inicio = Cont;
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Cont++;
                    Columna++;
                }else if(IsNumero(Codigo[Cont])){
                    Estado = 2;
                    Inicio = Cont;
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == '"'){
                    Estado = 3;
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Cont++;
                    Columna++;
                    Inicio = Cont;
                }else if(Codigo[Cont] == "'"){
                    Estado = 5;
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Cont++;
                    Columna++;
                    Inicio = Cont;
                }else if(Codigo[Cont] == "/"){
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Estado = 8;
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "&"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="&"){
                        Tokens.push(new Token("Simbolo_AND", "&&", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Errores.push(new Error("Lexico", Codigo[Cont-1], "El caracter no pertenece al lenguajes", Fila, Columna));
                    }
                }else if(Codigo[Cont] == "|"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="|"){
                        Tokens.push(new Token("Simbolo_OR", "||", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Errores.push(new Error("Lexico", Codigo[Cont-1], "El caracter no pertenece al lenguajes", Fila, Columna));
                    }
                }else if(Codigo[Cont] == "+"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="+"){
                        Tokens.push(new Token("Simbolo_Adicion", "++", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Mas", "+", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == "-"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="-"){
                        Tokens.push(new Token("Simbolo_Sustraccion", "--", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Menos", "-", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == "="){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="="){
                        Tokens.push(new Token("Simbolo_Comparacion", "==", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Igual", "=", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == ">"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="="){
                        Tokens.push(new Token("Simbolo_Mayor_Igual", ">=", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Mayor", ">", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == "<"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="="){
                        Tokens.push(new Token("Simbolo_Menor_Igual", "<=", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Menor", "<", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == "!"){
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && Codigo[Cont]=="="){
                        Tokens.push(new Token("Simbolo_Distinto", "!=", Fila, Columna-1));
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Negación", "!", Fila, Columna-1));
                    }
                }else if(Codigo[Cont] == "."){
                    Inicio = Cont;
                    FilaI = Fila;
                    ColumnaI = Columna;
                    Cont++;
                    Columna++;
                    if(Cont<Codigo.length && IsNumero(Codigo[Cont])){
                        Estado = 12;
                        Cont++;
                        Columna++;
                    }else{
                        Tokens.push(new Token("Simbolo_Punto", ".", Fila, Columna-1));
                    }
                }else{
                    Simbolos = ["{", "}", "(", ")", ";", "*", ",", "[", "]", "^"];
                    NSimbolo = ["Abrir_LLaves", "Cerrar_LLaves", "Abrir_Parentesis", "Cerrar_Parentesis", "Punto_Y_Coma", "Asterisco", "Coma", "Abrir_Corchete", "Cerrar_Corchete", "Xor"];
                    var Encontrado = false;
                    for(var i=0; i<Simbolos.length; i++){
                        if(!Encontrado && isEqual(Codigo[Cont], Simbolos[i])){
                            Tokens.push(new Token("Simbolo_" + NSimbolo[i], Codigo[Cont], Fila, Columna));
                            Encontrado = true;
                        }
                    }
                    if (!Encontrado){
                        Errores.push(new Error("Lexico", Codigo[Cont], "El caracter no pertenece al lenguajes", Fila, Columna));
                    }
                    Cont++;
                    Columna++;
                }
                break;
            case 1:
                if(IsLetra(Codigo[Cont]) || IsNumero(Codigo[Cont]) || Codigo[Cont] == "_"){
                    Cont++;
                    Columna++;
                }else{
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Reservadas = ["public", "class", "interface", "void", "int", "double", "char", "String", "boolean", "for", "while", "System", "out", "println", "print", "do", "if", "else", "break", "continue", "return", "static", "main", "args", "true", "false"]
                    var REncontrado = false;
                    for(var i=0; i<Reservadas.length; i++){
                        if(!REncontrado && Lexema == Reservadas[i]){
                            Tokens.push(new Token("Reservada_" + Reservadas[i], Lexema, FilaI, ColumnaI));
                            REncontrado = true;
                        }
                    }
                    if(!REncontrado){
                        Tokens.push(new Token("ID", Lexema, FilaI, ColumnaI));
                    }
                    Estado = 0
                }
                break;
            case 2:
                if(IsNumero(Codigo[Cont])){
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "."){
                    Cont++
                    Columna++;
                    Estado = 12
                }else{
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Entero", Lexema, FilaI, ColumnaI));
                    Estado = 0
                }
                break;
            case 3:
                if(Codigo[Cont] == "\""){
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Cadena", Lexema, FilaI, ColumnaI));
                    Estado = 0;
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "\n" || Cont+1==Codigo.length){
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Errores.push(new Error("Lexico", Lexema, "Cadena sin cerrar", FilaI, ColumnaI));
                    Estado = 0;
                }else if(Codigo[Cont] == "\\"){
                    Cont++;
                    Columna++;
                    Estado = 4;
                }else{
                    Cont++;
                    Columna++;
                }
                break;
            case 4:
                if(!(Codigo[Cont] == "n" || Codigo[Cont] == "b" || Codigo[Cont] == "t" || Codigo[Cont] == "r" || Codigo[Cont] == "f" || Codigo[Cont] == "\"" || Codigo[Cont] == "'" || Codigo[Cont] == "\\" || Codigo[Cont] == "u")){
                    Errores.push(new Error("Lexico", "\\" + Codigo[Cont], "Escape de \\ inexistente", Fila, Columna));
                }
                Cont++;
                Columna++;
                Estado = 3
                break;
            case 5:
                if(Codigo[Cont]=="\\"){
                    Estado = 6;
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "'"){
                    Cont++;
                    Columna++;
                    Errores.push(new Error("Lexico", "", "Caracter Vacio", FilaI, ColumnaI));
                    Estado = 0;
                }else if(Codigo[Cont] == "\n"){
                    Errores.push(new Error("Lexico", "", "Caracter Sin Cerrar", FilaI, ColumnaI));
                    Estado = 0;
                }else{
                    Cont++;
                    Columna++;
                    Estado = 7
                }
                break;
            case 6:
                if(!(Codigo[Cont] == "n" || Codigo[Cont] == "b" || Codigo[Cont] == "t" || Codigo[Cont] == "r" || Codigo[Cont] == "f" || Codigo[Cont] == "\"" || Codigo[Cont] == "'" || Codigo[Cont] == "\\" || Codigo[Cont] == "u")){
                    Errores.push(new Error("Lexico", "\\" + Codigo[Cont], "Escape de \\ inexistente", Fila, Columna));
                }
                Cont++;
                Columna++;
                Estado = 7;
                break;
            case 7:
                if(Codigo[Cont] == "'"){
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Caracter", Lexema, FilaI, ColumnaI));
                    Cont++;
                    Columna++;
                    Estado = 0;
                }else{
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Errores.push(new Error("Lexico", Codigo[Cont], "Toma de caracteres sin cerrar", FilaI, ColumnaI));
                    Estado = 0
                }
                break;
            case 8:
                if(Codigo[Cont] == "/"){
                    Cont++;
                    Columna++;
                    Inicio = Cont;
                    ColumnaI = Columna;
                    FilaI = FilaI;
                    Estado = 9;
                }else if(Codigo[Cont] == "*"){
                    Cont++;
                    Columna++;
                    Inicio = Cont;
                    ColumnaI = Columna;
                    FilaI = FilaI;
                    Estado = 10;
                }else{
                    Tokens.push(new Token("Simbolo_Diagonal", "/", Fila, Columna-1));
                    Estado = 0;
                }
                break;
            case 9:
                if(Cont+1<Codigo.length && Codigo[Cont] != "\n"){
                    Cont++;
                    Columna++;
                }else{
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Comentario_Unilinea", Lexema, FilaI, ColumnaI));
                    Estado = 0;
                }
                break;
            case 10:
                if(Cont+1==Codigo.length){
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Errores.push(new Error("Lexico", Lexema, "Comentario sin cerrar", FilaI, ColumnaI));
                    Estado = 0;
                }else if(Codigo[Cont] == "*"){
                    Estado = 11;
                    Cont++;
                    Columna++;
                }else if(Codigo[Cont] == "\n"){
                    Cont++
                    Columna = 1;
                    Fila++;
                }else{
                    Cont++
                    Columna++
                }
                break;
            case 11:
                if(Codigo[Cont]=="/"){
                    Lexema = "";
                    for(var i=Inicio; i<Cont-1; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Comentario_Multilinea", Lexema, FilaI, ColumnaI));
                    Estado = 0;
                }else if(Cont+1 == Codigo.length){
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Errores.push(new Error("Lexico", Lexema, "Comentario sin cerrar", FilaI, ColumnaI));
                    Estado = 0;
                }else{
                    Estado = 10;
                }
                break;
            case 12:
                if(IsNumero(Codigo[Cont])){
                    Cont++;
                    Columna++;
                }else{
                    Lexema = "";
                    for(var i=Inicio; i<Cont; i++){
                        Lexema += Codigo[i];
                    }
                    Tokens.push(new Token("Flotante", Lexema, FilaI, ColumnaI));
                    Estado = 0
                }
                break;
        }
    }
    for(var i=0; i<Tokens.length ;i++){
        console.log(i + " " + Tokens[i].Tipo + " " + Tokens[i].Lexema + " " + Tokens[i].Fila + " " + Tokens[i].Columna)
    }
}

function AnalizadorSintactico(){
    if(ContT < Tokens.length){
        Raiz = new Nodo("Raiz");
        Nuevo = new Nodo("Lista");
        Lista(Nuevo);
    }
    console.log("Lista Errores:");
    if(Errores.length == 0){
        console.log("Sin errores detectados");
    }
    for(var i=0; i<Errores.length ;i++){
        console.log(i + " " + Errores[i].Tipo + ", " + Errores[i].Lexema + ", " + Errores[i].Descripcion + ", " + Errores[i].Fila + ", " + Errores[i].Columna);
    }
}

function Lista(Actual){
    console.log("Lista");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Proximo = new Nodo("Selector");
            Parea("Reservada_public", "", Proximo);
            Selector(Nuevo);
        }else{
            ErrorSintactico("palabra reservada \"Public\"", "Simbolo_Cerrar_LLaves")
        }
        Nuevo = new Nodo("Lista")
        Actual.Agregar(Nuevo);
        Lista(Nuevo);
    }
}

function Selector(Nuevo){
    Nuevo = new Nodo(Actual);
    Actual.Agregar(Nuevo);
    console.log("Selector");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_class"){
            Parea("Reservada_class", "")
            if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                    ListaMetodos();
                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                        return;
                    }
                }
            }
        }else if(Tokens[ContT].Tipo == "Reservada_interface"){
            Parea("Reservada_interface", "")
            if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                    ListaDefiniones();
                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                        return;
                    }
                }
            }
        }
    }
    ErrorSintactico("palabra reservada \"class\" o \"interface\"", "Simbolo_Cerrar_LLaves")
}

function ListaMetodos(){
    console.log("ListaMetodos");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Parea("Reservada_public","");
            SelectorMetodo();
            ListaMetodos();
        }else if(Tokens[ContT].Tipo == "Reservada_int" ||Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion()
            ListaMetodos();
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos")
            ListaMetodos();
        }
    }
}

function SelectorMetodo(){
    console.log("SelectorMetodo");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_static"){
            Parea("Reservada_static", "Simbolo_Cerrar_LLaves");
            if(Parea("Reservada_void", "Simbolo_Cerrar_LLaves")){
                if(Parea("Reservada_main", "Simbolo_Cerrar_LLaves")){
                    if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
                        if(Parea("Reservada_String", "Simbolo_Cerrar_LLaves")){
                            if(Parea("Simbolo_Abrir_Corchete", "Simbolo_Cerrar_LLaves")){
                                if(Parea("Simbolo_Cerrar_Corchete", "Simbolo_Cerrar_LLaves")){
                                    if(Parea("Reservada_args", "Simbolo_Cerrar_LLaves")){
                                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                                                ListaInstrucciones();
                                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                                                    //Traducir
                                                }
                                            }
                                        }
                                    }
                                } 
                            }    
                        }
                    }
                }   
            }
        }else if(Tokens[ContT].Tipo == "Reservada_void"){
            Parea("Reservada_void", "Simbolo_Cerrar_LLaves");
            if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
                    if(ListaParametros()){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                                ListaInstrucciones();
                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                                    //Traducir
                                }
                            }
                        }
                    }
                }
            }
        }else if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Cerrar_LLaves");
            if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
                    if(ListaParametros()){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                                ListaInstrucciones();
                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                                    //Traducir
                                }
                            }
                        }
                    }
                }
            }
        }else{
            ErrorSintactico("palabra reservada \"static\", \"void\" o un indicador de tipo de dato", "Simbolo_Cerrar_LLaves")
        }
    }else{
        ErrorSintactico("palabra reservada \"static\", \"void\" o un indicador de tipo de dato", "Simbolo_Cerrar_LLaves")
    }
}

function ListaParametros(){
    console.log("ListaParametros");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Cerrar_LLaves");
            if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                if(ListaParametrosP()){
                    //Traduccion
                    return true;
                }
            }
            return false   
        }
    }
    return true;
}

function ListaParametrosP(){
    console.log("ListaParametrosP");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "");
            if(TiposVariables("Simbolo_Cerrar_LLaves")){
                if(Parea("ID", "Simbolo_Cerrar_LLaves")){
                    if(ListaParametrosP()){
                        //Traduccion
                        return true;
                    }
                }
            }   
            return false
        }
    }
    return true;
}

function TiposVariables(Panico){
    console.log("TiposVarables");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int"){
            Parea("Reservada_int", Panico);
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_double"){
            Parea("Reservada_double", Panico);
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_char"){
            Parea("Reservada_char", Panico);
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_String"){
            Parea("Reservada_String", Panico);
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_boolean"){
            Parea("Reservada_boolean", Panico);
            return true;
        }
    }
    ErrorSintactico("indicador de tipo de dato", Panico)
    return false;
}

function ListaInstrucciones(){
    console.log("ListaInstrucciones");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "ID"){
            Parea("ID", "");
            SelectorID();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_return"){
            Parea("Reservada_return", "");
            if(ValoresReturn()){
                //Traduccion
            }
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_continue"){
            Parea("Reservada_return", "");
            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                //Traduccion
            }
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_break"){
            Parea("Reservada_break", "");
            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                //Traduccion
            }
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_System"){
            Parea("Reservada_System", "");
            if(Parea("Simbolo_Punto", "Simbolo_Punto_Y_Coma")){
                if(Parea("Reservada_out", "Simbolo_Punto_Y_Coma")){
                    if(Parea("Simbolo_Punto", "Simbolo_Punto_Y_Coma")){
                        Prints();
                    }
                }
            }
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_if"){
            SentenciaIF();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_for"){
            SentenciaFor();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_while"){
            SentenciaWhile();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo == "Reservada_do"){
            SentenciaDo();
            ListaInstrucciones();
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos")
            ListaInstrucciones();
        }
    }
}

function Declaracion(){
    console.log("Declaracion");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(TiposVariables("Simbolo_Punto_Y_Coma")){
            if(Parea("ID", "Simbolo_Punto_Y_Coma")){
                if(DeclaracionP()){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                        //Traduccion
                        return true;
                    }
                }
            }
        }
        return false
    }
}

function DeclaracionP(){
    console.log("DeclaracionP");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "");
            if(Parea("ID", "Simbolo_Punto_Y_Coma")){
                if(DeclaracionP()){
                    //Traduccion
                    return true;
                }
            }
            return false;
        }else if(Tokens[ContT].Tipo == "Simbolo_Igual"){
            Parea("Simbolo_Igual", "");
            if(Expresion()){
                if(DeclaracionBP()){
                    //Traduccion
                    return true;
                }
            }else{
                ErrorSintactico("valor valido", "Ambos");
            }
            return false;
        }
        return true;
    }
}

function DeclaracionBP(){
    console.log("DeclaracionP");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "Simbolo_Punto_Y_Coma");
            if(Parea("ID", "Simbolo_Punto_Y_Coma")){
                if(DeclaracionP()){
                    //Traduccion
                    return true;
                }
            }
            return false;
        }
        return true;
    }
}

function Expresion(){
    console.log("Expresion");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Mas"){
            Parea("Simbolo_Mas", "");
        }else if(Tokens[ContT].Tipo == "Simbolo_Menos"){
            Parea("Simbolo_Menos", "");
        }
        return Exp();
    }
}

function Exp(){
    console.log("Exp");
    QuitarComentarios();
    if(ContT < Tokens.length){
        switch(Tokens[ContT].Tipo){
            case "Entero":
            case "Flotante":
            case "Cadena":
            case "Caracter":
            case "Reservada_true":
            case "Reservada_false":
                Parea(Tokens[ContT].Tipo, "");
                return Operador();
            case "Simbolo_Abrir_Parentesis":
                Parea(Tokens[ContT].Tipo, "");
                console.log("CDCDCDCDCCDCDC")
                if(Expresion()){
                    if (Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                        return Operador();
                    }else{
                        ContT=ContT-1
                        return true;
                    }
                }
                break;
            case "Simbolo_Negación":
                Parea(Tokens[ContT].Tipo, "");
                if(Exp()){
                    return Operador();
                }
                break;
            case "ID":  
                Parea(Tokens[ContT].Tipo, "");
                if(PosibilidadMetodo()){
                    return Operador();
                }else{
                    ContT=ContT-1
                    return true;
                }
                break;
        }
    }
    return false;
}

function Operador(){
    console.log("Operador");
    QuitarComentarios();
    if(ContT < Tokens.length){
        switch(Tokens[ContT].Tipo){
            case "Simbolo_Mas":
            case "Simbolo_Menos":
            case "Simbolo_Asterisco":
            case "Simbolo_Diagonal":
            case "Simbolo_Comparacion":
            case "Simbolo_Mayor":
            case "Simbolo_Mayor_Igual":
            case "Simbolo_Menor":
            case "Simbolo_Menor_Igual":
            case "Simbolo_Distinto":
            case "Simbolo_AND":
            case "Simbolo_OR":
            case "Simbolo_Xor":
                Parea(Tokens[ContT].Tipo, "");
                return Exp();
            case "Simbolo_Adicion":
            case "Simbolo_Sustraccion":
                Parea(Tokens[ContT].Tipo, "");
                return Operador();
        }
    }
    return true;
}

function PosibilidadMetodo(){
    console.log("PosibilidadMetodo");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Abrir_Parentesis"){
            Parea("Simbolo_Abrir_Parentesis", "");
            if(ListaValores()){
                return Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma");
            }
            return false;
        }
    }
    return true;
}

function ListaValores(){
    console.log("ListaValores");
    QuitarComentarios();
    if(ContT < Tokens.length){
        switch(Tokens[ContT].Tipo){
            case "Entero":
            case "Flotante":
            case "Cadena":
            case "Caracter":
            case "Reservada_true":
            case "Reservada_false":
            case "Simbolo_Abrir_Parentesis":
            case "Simbolo_Negación":
            case "ID":
            case "Simbolo_Mas":
            case "Simbolo_Menos":
                if(Expresion()){
                    return ListaValoresP();
                }
                return false;
        }
    }
    return true;
}

function ListaValoresP(){
    console.log("ListaValores");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "");
            if(Expresion()){
                return ListaValoresP();
            }
            return false;
        }
    }
    return true;
}

function SelectorID(){
    console.log("SelectorID");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Abrir_Parentesis"){
            Parea("Simbolo_Abrir_Parentesis", "")
            if(ListaValores()){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                        //Traduccion
                    }
                }
            }
        }else if(Tokens[ContT].Tipo == "Simbolo_Igual"){
            Parea("Simbolo_Igual", "")
            if(Expresion()){
                if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                    //Traduccion
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma");
            }
        } else{
            ErrorSintactico("simbolo de abrir parentesis o simbolo igual", "Simbolo_Punto_Y_Coma")
        }
    }else{
        ErrorSintactico("simbolo de abrir parentesis o simbolo igual", "Simbolo_Punto_Y_Coma")
    }
}

function ValoresReturn(){
    console.log("ValoresReturn");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo != "Simbolo_Punto_Y_Coma"){
            if(Expresion()){
                Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma");
            }else{
                ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma");
            }
        }else{
            Parea("Simbolo_Punto_Y_Coma", "");
        }
    }
}

function Prints(){
    console.log("Prints");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_println"){
            Parea("Reservada_println", "")
            if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma")){
                if(Expresion()){
                    if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                        if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                            return true;
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma");
                }
            }
        }else if(Tokens[ContT].Tipo == "Reservada_print"){
            Parea("Reservada_print", "")
            if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma")){
                if(Expresion()){
                    if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                        if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                            return true;
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma");
                }
            }
        } else{
            ErrorSintactico("simbolo de abrir parentesis o simbolo igual", "Simbolo_Punto_Y_Coma")
        }
    }else{
        ErrorSintactico("simbolo de abrir parentesis o simbolo igual", "Simbolo_Punto_Y_Coma")
    }
    return false;
}

function SentenciaIF(){
    console.log("SentenciaIF");
    QuitarComentarios()
    if(ContT < Tokens.length){
        Parea("Reservada_if", "")
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
            if(Expresion()){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                    if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                        ListaInstrucciones();
                        if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                            //Traduccion
                            CaminosIF();
                        }
                    }
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves");
            }
        }
    }
    return false;
}

function CaminosIF(){
    console.log("CaminosIF");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_else"){
            Parea("Reservada_else", "")
            OpcionElse();
        }
    }
    return true;
}

function OpcionElse(){
    console.log("OpcionElse");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_if"){
            SentenciaIF();
        }else if(Tokens[ContT].Tipo == "Simbolo_Abrir_LLaves"){
            if(Parea("Simbolo_Abrir_LLaves", "")){
                ListaInstrucciones();
                Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")
            }
        }
    }
    return false;
}

function SentenciaFor(){
    console.log("SentenciaFor");
    QuitarComentarios()
    if(ContT < Tokens.length){
        Parea("Reservada_for", "")
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
            if(Declaracion()){
                if(Expresion()){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Cerrar_LLaves")){
                        if(Expresion()){
                            if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                                    ListaInstrucciones();
                                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                                        //Traduccion
                                    }
                                }
                            }
                        }else{
                            ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves");
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves");
                }   
            }else{
                while(ContT < Tokens.length && Tokens[ContT-1].Tipo != "Simbolo_Cerrar_LLaves"){
                    ContT++;
                }
            }
        }
    }
    return false;
}

function SentenciaWhile(){
    console.log("SentenciaWhile");
    QuitarComentarios()
    if(ContT < Tokens.length){
        Parea("Reservada_while", "")
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves")){
            if(Expresion()){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves")){
                    if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
                        ListaInstrucciones();
                        if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                            //Traduccion
                        }
                    }
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves");
            }
        }
    }
    return false;
}

function SentenciaDo(){
    console.log("SentenciaDo");
    QuitarComentarios()
    if(ContT < Tokens.length){
        Parea("Reservada_do", "")
        if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves")){
            ListaInstrucciones();
            if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves")){
                if(Parea("Reservada_while", "Simbolo_Punto_Y_Coma")){
                    if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma")){
                        if(Expresion()){
                            if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                                if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                                    //Traduccion
                                }
                            }
                        }else{
                            ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma");
                        }
                    }
                }
            }else{
                while(ContT < Tokens.length && Tokens[ContT-1].Tipo != "Simbolo_Punto_Y_Coma"){
                    ContT++;
                }
            }
        }else{
            while(ContT < Tokens.length && Tokens[ContT-1].Tipo != "Simbolo_Punto_Y_Coma"){
                ContT++;
            }
        }
    }
    return false;
}

function ListaDefiniones(){
    console.log("ListaDefinciones");
    QuitarComentarios()
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Parea("Reservada_public","");
            SelectorDefincion();
            ListaDefiniones();
        }else if(Tokens[ContT].Tipo == "Reservada_int" ||Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion()
            ListaDefiniones();
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos")
            ListaDefiniones();
        }
    }
}

function SelectorDefincion(){
    console.log("SelectorDefincion");
    QuitarComentarios();
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_void"){
            Parea("Reservada_void", "");
            if(Parea("ID", "Simbolo_Punto_Y_Coma")){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma")){
                    if(ListaParametros()){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                                //Traducir
                            }
                        }
                    }
                }
            }
        }else if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Punto_Y_Coma");
            if(Parea("ID", "Simbolo_Punto_Y_Coma")){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma")){
                    if(ListaParametros()){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma")){
                            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma")){
                                //Traducir
                            }
                        }
                    }
                }
            }
        }else{
            ErrorSintactico("palabra reservada \"static\", \"void\" o un indicador de tipo de dato", "Simbolo_Punto_Y_Coma")
        }
    }else{
        ErrorSintactico("palabra reservada \"void\" o un indicador de tipo de dato", "Simbolo_Cerrar_LLaves")
    }
}

function Parea(Esperado, Panico, Actual){
    QuitarComentarios()
    if(ContT < Tokens.length && Tokens[ContT].Tipo == Esperado){
        console.log("Parea: " + Esperado + ", " + Tokens[ContT].Tipo);
        ContT++;
        return true;
    }else{
        ErrorSintactico(Esperado, Panico);
        return false;
    }
}

function ErrorSintactico(Esperado, Panico, Actual){
    if(ContT < Tokens.length){
        if(Panico == "Ambos"){
            console.log("Parea: " + Esperado + "," + Tokens[ContT].Tipo);
            Errores.push(new Error("Sintactico", Tokens[ContT].Tipo ,  "Vino " + Tokens[ContT].Tipo + " y se esperaba " + Esperado, Tokens[ContT].Fila, Tokens[ContT].Columna));
            do{
                ContT++;
            }while(ContT < Tokens.length && Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves" && Tokens[ContT-1].Tipo != "Simbolo_Punto_Y_Coma");
        }else{
            console.log("Parea: " + Esperado + "," + Tokens[ContT].Tipo);
            console.log(Panico);
            Errores.push(new Error("Sintactico", Tokens[ContT].Tipo ,  "Vino " + Tokens[ContT].Tipo + " y se esperaba " + Esperado, Tokens[ContT].Fila, Tokens[ContT].Columna));
            do{
                ContT++;
            }while(ContT < Tokens.length && Tokens[ContT-1].Tipo != Panico);
        }
    }else{
        console.log("Parea: " + Esperado + ", [Vacio]");
        Errores.push(new Error("Sintactico", "[Vacio]" , "se esperaba " + Esperado, Tokens[ContT-1].Fila, Tokens[ContT-1].Columna + Tokens[ContT-1].Lexema.length + 1));
    }
}

function QuitarComentarios(){
    if(ContT < Tokens.length){
        while(Tokens[ContT].Tipo == "Comentario_Unilinea" || Tokens[ContT].Tipo == "Comentario_Multilinea"){
            Parea(Tokens[ContT].Tipo, "");
        }
    }
}

Main();