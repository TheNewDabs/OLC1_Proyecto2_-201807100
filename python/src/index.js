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

    constructor(Nombre, Traduccion){
        this.Nombre = Nombre;
        this.Hijos = Array();
        this.Traducir = true;
        this.Traduccion = Traduccion;
    }

    NoTraducir(){
        this.Traducir = false;
        for(var i=0; i<this.Hijos.length ;i++){
            this.Hijos[i].NoTraducir();            
        }
    }

    Agregar(Nuevo){
        this.Hijos.push(Nuevo);
    }

    Mostrar(Cadena){
        for(var i=0; i<this.Hijos.length ;i++){
            if(this.Hijos[i] != null){
                console.log(this.Hijos[i].Traduccion + ";" + Cadena + ";" + i + ";" + this.Hijos[i].Nombre + ";" + this.Traducir);
                this.Hijos[i].Mostrar(Cadena + ";" + i);
            }
        }
    }

    TraducirNodo(){
        if(this.Traducir){
            if(this.Traduccion == ":"){
                Identado = Identado+1;
                return this.Traduccion + "\n" + this.Identar(Identado);
            }else if(this.Traduccion == "?"){
                Identado = Identado-1;
                return "\n" + this.Identar(Identado);
            }else if(this.Traduccion == ";"){
                return this.Traduccion + "\n" + this.Identar(Identado); 
            }else if(this.Traduccion != ""){
                return this.Traduccion;
            }
            this.Trad = "";
            for(var i=0; i<this.Hijos.length ;i++){
                if(this.Hijos[i] != null){
                    this.Trad += this.Hijos[i].TraducirNodo(Identado);
                }
            }
            return this.Trad;
        }else{
            return "";
        }
    }

    Identar(){
        this.Sangrado = "";
        for(var i=0; i<Identado ;i++){
            this.Sangrado+="\t"
        }
        return this.Sangrado
    }
}

let Tokens = new Array()
let Errores = new Array()
let Raiz = null;
let ContT = 0;
let Identado = 0;

function Cod(){
    return `
    /********************************************************
*********************************************************
*********************COMPILADORES 1**********************
*********************************************************
********************SEGUNDO SEMESTRE*********************
*********************************************************
**************************2020***************************
*********************************************************
*******************ENTRADA DE PRUEBA*********************
*********************************************************
***********************PROYECTO 2************************
*********************************************************
********************************************************/

public interface interfaz {
    public void helo(String h);
} 


public class prueba_1 {


    public int fibonacci(int n) {
        if (n > 1){
            return fibonacci(n-1) + fibonacci(n-2);  //función recursiva

        } else if (n == 1 || n == 0) {  // caso base
            return 1;

        } else { //error
            System.out.println("Debes ingresar un tamaño mayor o igual a 1, ingresaste: " + n);
            return -1; 
            
        }
    }


    public int Ack(int m, int n){
        if (m == 0) {
            return n + 1;

        } else if (n == 0) {
            return Ack(m - 1, 1);

        } else {
            return Ack(m - 1, Ack(m, n - 1));
        }
    }


    public static void main(String[] args) {
        int num = 32465;

        System.out.println("El factorial de " + num + " es: " + factorial(num));

    }

     
    public int factorial(int num){
        if(num == 0){
            return 1;
        } else {
            return num * factorial(num-1);
        }
    }

    public String helo(String h){
        return "Bienvenido a Compiladores 1 " + h;
    }

}

`;
}

async function Main(){
    await app.listen(3000);
    console.log('Server on port 300');
    Analizador();
    return
}

function Analizador(){
    Tokens = new Array()
    Errores = new Array()
    Raiz = null;
    ContT = 0;
    AnalizadorLexico(Cod());
    AnalizadorSintactico();
    console.log("FIN");
    return;
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
}

function NuevoNodo(Actual, Nombre){
    var Nuevo = new Nodo(Nombre, "")
    Actual.Agregar(Nuevo);
    return Nuevo;
}

function NuevoNodoT(Actual, Nombre, Traduccion){
    var Nuevo = new Nodo(Nombre, Traduccion)
    Actual.Agregar(Nuevo);
    return Nuevo;
}

function AnalizadorSintactico(){
    Identado = 0;
    Raiz = new Nodo("Raiz", "");
    if(ContT < Tokens.length){
        Lista(NuevoNodo(Raiz, "Lista"));
    }
    console.log("Lista Errores:");
    if(Errores.length == 0){
        console.log("Sin errores detectados");
    }
    for(var i=0; i<Errores.length ;i++){
        console.log(i + " " + Errores[i].Tipo + ", " + Errores[i].Lexema + ", " + Errores[i].Descripcion + ", " + Errores[i].Fila + ", " + Errores[i].Columna);
    }
    console.log(Raiz.TraducirNodo());
}

function Lista(Actual){
    console.log("Lista");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Nuevo = NuevoNodo(Actual, "Selector");
            Parea("Reservada_public", "", Nuevo, "");
            Selector(Nuevo);
        }else{
            ErrorSintactico("palabra reservada \"Public\"", "Simbolo_Cerrar_LLaves", new Nodo("Vacio", ""))
        }
        Lista(NuevoNodo(Actual, "Lista"));
    }
}

function Selector(Actual){
    console.log("Selector");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_class"){
            Parea("Reservada_class", "", Actual, "class ")
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Tipo)){
                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                    Nuevo = NuevoNodo(Actual, "ListaMetodos");
                    ListaMetodos(Nuevo);
                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                        return;
                    }
                }
            }
            return;
        }else if(Tokens[ContT].Tipo == "Reservada_interface"){
            Parea("Reservada_interface", "", Actual, "class ")
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Tipo)){
                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                    ListaDefiniones(NuevoNodo(Actual, "ListaDefiniciones"));
                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                        return;
                    }
                }
            }
            return;
        }
    }
    ErrorSintactico("palabra reservada \"class\" o \"interface\"", "Simbolo_Cerrar_LLaves", Actual)
}

function ListaMetodos(Actual){
    console.log("ListaMetodos");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Nuevo = NuevoNodo(Actual, "SelectorMetodo");
            Parea("Reservada_public","", Nuevo, "");
            SelectorMetodo(Nuevo);
            ListaMetodos(NuevoNodo(Actual, "ListaMetodos"));
        }else if(Tokens[ContT].Tipo == "Reservada_int" ||Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion(NuevoNodo(Actual, "Declaracion"))
            ListaMetodos(NuevoNodo(Actual, "ListaMetodos"));
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos", Actual)
            ListaMetodos(NuevoNodo(Actual, "ListaMetodos"));
        }
    }
}

function SelectorMetodo(Actual){
    console.log("SelectorMetodo");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_static"){
            Parea("Reservada_static", "Simbolo_Cerrar_LLaves", Actual, "");
            if(Parea("Reservada_void", "Simbolo_Cerrar_LLaves", Actual, "def ")){
                if(Parea("Reservada_main", "Simbolo_Cerrar_LLaves", Actual, "main")){
                    if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "(")){
                        if(Parea("Reservada_String", "Simbolo_Cerrar_LLaves", Actual, "")){
                            if(Parea("Simbolo_Abrir_Corchete", "Simbolo_Cerrar_LLaves", Actual, "")){
                                if(Parea("Simbolo_Cerrar_Corchete", "Simbolo_Cerrar_LLaves", Actual, "")){
                                    if(Parea("Reservada_args", "Simbolo_Cerrar_LLaves", Actual, "")){
                                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, ")")){
                                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                                                ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
                                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                                                    return;
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
            return
        }else if(Tokens[ContT].Tipo == "Reservada_void"){
            Parea("Reservada_void", "Simbolo_Cerrar_LLaves", Actual, "def ");
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Lexema)){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "(")){
                    if(ListaParametros(NuevoNodo(Actual, "ListaParametros"))){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, ")")){
                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                                ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            return
        }else if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Cerrar_LLaves", NuevoNodo(Actual, "TiposVariables"));
            Actual.Hijos[1].Hijos[0].Traduccion = "def ";
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Lexema)){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "(")){
                    if(ListaParametros(NuevoNodo(Actual, "ListaParametros"))){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, ")")){
                            if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                                ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
                                if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                                    return
                                }
                            }
                        }
                    }
                }
            }
            return
        }
    }
    ErrorSintactico("palabra reservada \"static\", \"void\" o un indicador de tipo de dato", "Simbolo_Cerrar_LLaves", Actual)
    
}

function ListaParametros(Actual){
    console.log("ListaParametros");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Cerrar_LLaves", NuevoNodo(Actual, "TiposVariables"));
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Lexema)){
                if(ListaParametrosP(NuevoNodo(Actual, "ListaParametrosP"))){
                    return true;
                }
            }
            return false   
        }
    }
    return true;
}

function ListaParametrosP(Actual){
    console.log("ListaParametrosP");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "", Actual, ", ");
            if(TiposVariables("Simbolo_Cerrar_LLaves", NuevoNodo(Actual, "TiposVariables"))){
                QuitarComentarios(Actual);
                if(Parea("ID", "Simbolo_Cerrar_LLaves", Actual, Tokens[ContT].Lexema)){
                    if(ListaParametrosP(NuevoNodo(Actual, "ListaParametrosP"))){
                        return true;
                    }
                }
            }   
            return false
        }
    }
    return true;
}

function TiposVariables(Panico, Actual){
    console.log("TiposVariables");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int"){
            Parea("Reservada_int", Panico, Actual, "var ");
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_double"){
            Parea("Reservada_double", Panico, Actual, "var ");
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_char"){
            Parea("Reservada_char", Panico, Actual, "var ");
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_String"){
            Parea("Reservada_String", Panico, Actual, "var ");
            return true;
        }else if(Tokens[ContT].Tipo == "Reservada_boolean"){
            Parea("Reservada_boolean", Panico, Actual, "var ");
            return true;
        }
    }
    ErrorSintactico("indicador de tipo de dato", Panico, Actual)
    return false;
}

function ListaInstrucciones(Actual){
    console.log("ListaInstrucciones");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion(NuevoNodo(Actual, "Declaracion"));
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "ID"){
            Nuevo = NuevoNodo(Actual, "SelectorID");
            Parea("ID", "", NuevoTokens[ContT].Lexema);
            SelectorID(Nuevo);
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_return"){
            Nuevo = NuevoNodo(Actual, "ValoresReturn");
            Parea("Reservada_return", "", Nuevo, "return");
            ValoresReturn(Nuevo);
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_continue"){
            Nuevo = NuevoNodo(Actual, "Continuar");
            Parea("Reservada_continue", "", Nuevo, "continue");
            Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Nuevo, ";")
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_break"){
            Nuevo = NuevoNodo(Actual, "Break");
            Parea("Reservada_break", "", Nuevo, "break");
            Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Nuevo, ";")
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_System"){
            Nuevo = NuevoNodo(Actual, "Prints");
            Parea("Reservada_System", "", Nuevo, "");
            if(Parea("Simbolo_Punto", "Simbolo_Punto_Y_Coma", Nuevo, "")){
                if(Parea("Reservada_out", "Simbolo_Punto_Y_Coma", Nuevo, "")){
                    if(Parea("Simbolo_Punto", "Simbolo_Punto_Y_Coma", Nuevo, "")){
                        Prints(Nuevo);
                    }
                }
            }
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_if"){
            SentenciaIF(NuevoNodo(Actual, "SentenciaIF"), "if ");
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_for"){
            SentenciaFor(NuevoNodo(Actual, "SentenciaFor"));
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_while"){
            SentenciaWhile(NuevoNodo(Actual, "SentenciaWhile"));
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_do"){
            SentenciaDo(NuevoNodo(Actual, "Do"));
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos", Actual)
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
        }
    }
}

function Declaracion(Actual){
    console.log("Declaracion");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(TiposVariables("Simbolo_Punto_Y_Coma", NuevoNodo(Actual, "TiposVariables"))){
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Punto_Y_Coma", Actual, Tokens[ContT].Lexema)){
                if(DeclaracionP(NuevoNodo(Actual, "DeclaracionP"))){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                        return true;
                    }
                }
            }
        }
    }
    return false
}

function DeclaracionP(Actual){
    console.log("DeclaracionP");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "", Actual, ",");
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Punto_Y_Coma", Actual, Tokens[ContT].Lexema)){
                if(DeclaracionP(NuevoNodo(Actual, "DeclaracionP"))){
                    return true;
                }
            }
        }else if(Tokens[ContT].Tipo == "Simbolo_Igual"){
            Parea("Simbolo_Igual", "", Actual, " = ");
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                if(DeclaracionBP(NuevoNodo(Actual, "DeclaracionBP"))){
                    return true;
                }
            }else{
                ErrorSintactico("valor valido", "Ambos", Actual);
                return false;
            }
        }
    }
    return true;
}

function DeclaracionBP(Actual){
    console.log("DeclaracionBP");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "Simbolo_Punto_Y_Coma", Actual, ",");
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Punto_Y_Coma", Actual, Tokens[ContT].Lexema)){
                if(DeclaracionP(NuevoNodo(Actual, "DeclaracionP"))){
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}

function Expresion(Actual){
    console.log("Expresion");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Mas"){
            Parea("Simbolo_Mas", "", Actual, "+");
        }else if(Tokens[ContT].Tipo == "Simbolo_Menos"){
            Parea("Simbolo_Menos", "", Actual, "-");
        }
        return Exp(NuevoNodo(Actual, "Exp"));
    }
    return false;
}

function Exp(Actual){
    console.log("Exp");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        switch(Tokens[ContT].Tipo){
            case "Entero":
            case "Flotante":
            case "Cadena":
            case "Caracter":
                Parea(Tokens[ContT].Tipo, "", Actual, Tokens[ContT].Lexema);
                return Operador(NuevoNodo(Actual, "Operador"));
            case "Reservada_true":
                Parea(Tokens[ContT].Tipo, "", Actual, "True");
                return Operador(NuevoNodo(Actual, "Operador"));
            case "Reservada_false":
                Parea(Tokens[ContT].Tipo, "", Actual, "False");
                return Operador(NuevoNodo(Actual, "Operador"));
            case "Simbolo_Abrir_Parentesis":
                Parea(Tokens[ContT].Tipo, "", Actual, "(");
                if(Expresion(NuevoNodo(Actual, "Expresion"))){
                    if (Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")")){
                        return Operador(NuevoNodo(Actual, "Operador"));
                    }else{
                        ContT=ContT-1
                        return true;
                    }
                }
                break;
            case "Simbolo_Negación":
                Parea(Tokens[ContT].Tipo, "", Actual, "not ");
                if(Exp(NuevoNodo(Actual, "Exp"))){
                    return Operador(NuevoNodo(Actual, "Operador"));
                }
                break;
            case "ID":  
                Parea(Tokens[ContT].Tipo, "", Actual, Tokens[ContT].Lexema);
                if(PosibilidadMetodo(NuevoNodo(Actual, "PosibilidadMetodo"))){
                    return Operador(NuevoNodo(Actual, "Operador"));
                }else{
                    ContT=ContT-1
                    return true;
                }
        }
    }
    return false;
}

function Operador(Actual){
    console.log("Operador");
    QuitarComentarios(Actual);
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
                Parea(Tokens[ContT].Tipo, "", Actual," " + Tokens[ContT].Lexema + " ");
                return Exp(NuevoNodo(Actual, "Exp"));
            case "Simbolo_AND":
                Parea(Tokens[ContT].Tipo, "", Actual," " + "and" + " ");
                return Exp(NuevoNodo(Actual, "Exp"));
            case "Simbolo_OR":
                Parea(Tokens[ContT].Tipo, "", Actual," " + "or" + " ");
                return Exp(NuevoNodo(Actual, "Exp"));
            case "Simbolo_Xor":
                Parea(Tokens[ContT].Tipo, "", Actual," " + "xor" + " ");
                return Exp(NuevoNodo(Actual, "Exp"));
            case "Simbolo_Adicion":
                Parea(Tokens[ContT].Tipo, "", Actual, " + 1");
                return Operador(NuevoNodo(Actual, "Operador"));
            case "Simbolo_Sustraccion":
                Parea(Tokens[ContT].Tipo, "", Actual, "-  1");
                return Operador(NuevoNodo(Actual, "Operador"));
        }
    }
    return true;
}

function PosibilidadMetodo(Actual){
    console.log("PosibilidadMetodo");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Abrir_Parentesis"){
            Parea("Simbolo_Abrir_Parentesis", "", Actual, "(");
            if(ListaValores(NuevoNodo(Actual, "ListaValores"))){
                return Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")");
            }
            return false;
        }
    }
    return true;
}

function ListaValores(Actual){
    console.log("ListaValores");
    QuitarComentarios(Actual);
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
                if(Expresion(NuevoNodo(Actual, "Expresion"))){
                    return ListaValoresP(NuevoNodo(Actual, "ListaValoresP"));
                }
                return false;
        }
    }
    return true;
}

function ListaValoresP(Actual){
    console.log("ListaValoresP");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Coma"){
            Parea("Simbolo_Coma", "", Actual, ", ");
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                return ListaValoresP(NuevoNodo(Actual, "ListaValoresP"));
            }
            return false;
        }
    }
    return true;
}

function SelectorID(Actual){
    console.log("SelectorID");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Simbolo_Abrir_Parentesis"){
            Parea("Simbolo_Abrir_Parentesis", "", Actual, "(")
            if(ListaValores(NuevoNodo(Actual, "ListaValores"))){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")")){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                        return
                    }
                }
            }
            return
        }else if(Tokens[ContT].Tipo == "Simbolo_Igual"){
            Parea("Simbolo_Igual", "", Actual, " = ")
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                    return
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma", Actual);
            }
            return;
        }
    }
    ErrorSintactico("simbolo de abrir parentesis o simbolo igual", "Simbolo_Punto_Y_Coma")
}

function ValoresReturn(Actual){
    console.log("ValoresReturn");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo != "Simbolo_Punto_Y_Coma"){
            Actual.Hijos[0].Traduccion = Actual.Hijos[0].Traduccion + " ";
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";");
            }else{
                ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma", Actual);
            }
        }else{
            Parea("Simbolo_Punto_Y_Coma", "", Actual, ";");
        }
    }
}

function Prints(Actual){
    console.log("Prints");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_println"){
            Parea("Reservada_println", "", Actual, "print")
            if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "(")){
                if(Expresion(NuevoNodo(Actual, "Expresion"))){
                    if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ", end=\"\")")){
                        if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                            return true;
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma", Actual);
                }
            }
        }else if(Tokens[ContT].Tipo == "Reservada_print"){
            Parea("Reservada_print", "", Actual, "print")
            if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "(")){
                if(Expresion(NuevoNodo(Actual, "Expresion"))){
                    if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")")){
                        if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                            return true;
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma", Actual);
                }
            }
        } else{
            ErrorSintactico("Se esperaba palabra reservada \"print\" o \"println\" ", "Simbolo_Punto_Y_Coma", Actual)
        }
    }else{
        ErrorSintactico("Se esperaba palabra reservada \"print\" o \"println\" ", "Simbolo_Punto_Y_Coma", Actual)
    }
    return false;
}

function SentenciaIF(Actual, Traduccion){
    console.log("SentenciaIF");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        Parea("Reservada_if", "", Actual, Traduccion)
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "")){
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "")){
                    if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                        ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
                        if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                            CaminosIF(NuevoNodo(Actual, "CaminosIf"));
                            return true;
                        }
                    }
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves", Actual);
            }
        }
    }
    return false;
}

function CaminosIF(Actual){
    console.log("CaminosIF");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_else"){
            Nuevo = NuevoNodo(Actual, "else");
            Parea("Reservada_else", "", Nuevo, "")
            OpcionElse(Nuevo);
        }
    }
    return true;
}

function OpcionElse(Actual){
    console.log("OpcionElse");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_if"){
            SentenciaIF(Actual, "elif ");
        }else if(Tokens[ContT].Tipo == "Simbolo_Abrir_LLaves"){
            if(Parea("Simbolo_Abrir_LLaves", "", Actual, "else:")){
                ListaInstrucciones(NuevoNodo(Actual, "ListaIntrucciones"));
                Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")
            }
        }
    }
    return false;
}

function SentenciaFor(Actual){
    console.log("SentenciaFor");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        Parea("Reservada_for", "", Actual, "for ")
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "")){
            if(Declaracion(NuevoNodo(Actual, "Declaracion"))){
                Actual.Hijos[2].Hijos[0].NoTraducir();
                Actual.Hijos[2].Hijos[Actual.Hijos[2].Hijos.length-1].Traduccion = " in range(";
                if(Expresion(NuevoNodo(Actual, "Expresion"))){
                    if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Cerrar_LLaves", Actual, ",")){
                        if(Expresion(NuevoNodo(Actual, "Expresion"))){
                            if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, ")")){
                                if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                                    ListaInstrucciones(NuevoNodo(Actual, "ListaIntrucciones"));
                                    if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                                        return
                                    }
                                }
                            }
                        }else{
                            ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves", Actual);
                        }
                    }
                }else{
                    ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves". Actual);
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

function SentenciaWhile(Actual){
    console.log("SentenciaWhile");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        Parea("Reservada_while", "", Actual, "while ")
        if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "")){
            if(Expresion(NuevoNodo(Actual, "Expresion"))){
                if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Cerrar_LLaves", Actual, "")){
                    if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
                        ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
                        if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                            return
                        }
                    }
                }
            }else{
                ErrorSintactico("valor valido", "Simbolo_Cerrar_LLaves", Actual);
            }
        }
    }
    return false;
}

function SentenciaDo(Actual){
    console.log("SentenciaDo");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        Parea("Reservada_do", "", Actual, "do")
        if(Parea("Simbolo_Abrir_LLaves", "Simbolo_Cerrar_LLaves", Actual, ":")){
            ListaInstrucciones(NuevoNodo(Actual, "ListaInstrucciones"));
            if(Parea("Simbolo_Cerrar_LLaves", "Simbolo_Cerrar_LLaves", Actual, "?")){
                if(Parea("Reservada_while", "Simbolo_Punto_Y_Coma", Actual, "while ")){
                    if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "")){
                        if(Expresion(NuevoNodo(Actual, "Expresion"))){
                            if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "")){
                                if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                                    return
                                }
                            }
                        }else{
                            ErrorSintactico("valor valido", "Simbolo_Punto_Y_Coma", Actual);
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

function ListaDefiniones(Actual){
    console.log("ListaDefinciones");
    QuitarComentarios(Actual)
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_public"){
            Nuevo = NuevoNodo(Actual, "SelectorDefinicion");
            Parea("Reservada_public","", Nuevo, "def ");
            SelectorDefincion(Nuevo);
            ListaDefiniones(NuevoNodo(Actual, "ListaDefiniciones"));
        }else if(Tokens[ContT].Tipo == "Reservada_int" ||Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            Declaracion(NuevoNodo(Actual, "Declaracion"))
            ListaDefiniones(NuevoNodo(Actual, "ListaDefiniciones"));
        }else if(Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves"){
            ErrorSintactico("Inicio de instruccion valida", "Ambos", Actual)
            ListaDefiniones(NuevoNodo(Actual, "ListaDefiniciones"));
        }
    }
}

function SelectorDefincion(Actual){
    console.log("SelectorDefinciones");
    QuitarComentarios(Actual);
    if(ContT < Tokens.length){
        if(Tokens[ContT].Tipo == "Reservada_void"){
            Parea("Reservada_void", "", Actual, "");
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Punto_Y_Coma", Actual, Tokens[ContT].Lexema)){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "(")){
                    if(ListaParametros(NuevoNodo(Actual, "ListaParametros"))){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")")){
                            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                                return;
                            }
                        }
                    }
                }
            }
            return;
        }else if(Tokens[ContT].Tipo == "Reservada_int" || Tokens[ContT].Tipo == "Reservada_double" || Tokens[ContT].Tipo == "Reservada_char" || Tokens[ContT].Tipo == "Reservada_String" || Tokens[ContT].Tipo == "Reservada_boolean"){
            TiposVariables("Simbolo_Punto_Y_Coma", NuevoNodo(Actual, "TiposVariables"));
            QuitarComentarios(Actual);
            if(Parea("ID", "Simbolo_Punto_Y_Coma", Actual, Tokens[ContT].Lexema)){
                if(Parea("Simbolo_Abrir_Parentesis", "Simbolo_Punto_Y_Coma", Actual, "(")){
                    if(ListaParametros(NuevoNodo(Actual, "ListaParametros"))){
                        if(Parea("Simbolo_Cerrar_Parentesis", "Simbolo_Punto_Y_Coma", Actual, ")")){
                            if(Parea("Simbolo_Punto_Y_Coma", "Simbolo_Punto_Y_Coma", Actual, ";")){
                                return;
                            }
                        }
                    }
                }
            }
            return;
        }
    }
    ErrorSintactico("palabra reservada \"void\" o un indicador de tipo de dato", "Simbolo_Cerrar_LLaves")
}

function Parea(Esperado, Panico, Actual, Traduccion){
    QuitarComentarios()
    console.log("Parea:" + Esperado + ", Viene" + Tokens[ContT].Tipo);
    if(ContT < Tokens.length && Tokens[ContT].Tipo == Esperado){
        NuevoNodoT(Actual, Tokens[ContT].Tipo, Traduccion);
        ContT++;
        return true;
    }else{
        ErrorSintactico(Esperado, Panico, Actual);
        return false;
    }
}

function ErrorSintactico(Esperado, Panico, Actual){
    if(ContT < Tokens.length){
        Actual.NoTraducir();
        if(Panico == "Ambos"){
            Errores.push(new Error("Sintactico", Tokens[ContT].Tipo ,  "Vino " + Tokens[ContT].Tipo + " y se esperaba " + Esperado, Tokens[ContT].Fila, Tokens[ContT].Columna));
            do{
                ContT++;
            }while(ContT < Tokens.length && Tokens[ContT].Tipo != "Simbolo_Cerrar_LLaves" && Tokens[ContT-1].Tipo != "Simbolo_Punto_Y_Coma");
        }else{
            Errores.push(new Error("Sintactico", Tokens[ContT].Tipo ,  "Vino " + Tokens[ContT].Tipo + " y se esperaba " + Esperado, Tokens[ContT].Fila, Tokens[ContT].Columna));
            do{
                ContT++;
            }while(ContT < Tokens.length && Tokens[ContT-1].Tipo != Panico);
        }
    }else{
        Errores.push(new Error("Sintactico", "[Vacio]" , "se esperaba " + Esperado, Tokens[ContT-1].Fila, Tokens[ContT-1].Columna + Tokens[ContT-1].Lexema.length + 1));
    }
}

function QuitarComentarios(Actual){
    console.log("QuitarComentario");
    if(ContT < Tokens.length){
        while((Tokens[ContT].Tipo == "Comentario_Unilinea" || Tokens[ContT].Tipo == "Comentario_Multilinea")){
            if(Tokens[ContT].Tipo == "Comentario_Unilinea"){
                NuevoNodoT(Actual, Tokens[ContT].Tipo, "#" + Tokens[ContT].Lexema + "\n");
                ContT++;
            }else{
                NuevoNodoT(Actual, Tokens[ContT].Tipo, "'''" + Tokens[ContT].Lexema + "'''\n");
                ContT++;
            }
        }
    }
}

Main();