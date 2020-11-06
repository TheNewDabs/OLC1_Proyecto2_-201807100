%{
    //let CNodoError=require('../JavaAST/NodoError');
    const Nodo = require("./nodo");

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

	var ListaErrores = [];
	var ListaTokens = [];
%}
%lex

%options case-insensitive

%%

\s+										// Espacios
"//".*									// comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		// comentario multilinea

"public"					{ListaTokens.push(new Token('Reservada_public', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_public';}
"class"						{ListaTokens.push(new Token('Reservada_class', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_class';}
"interface"					{ListaTokens.push(new Token('Reservada_interface', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_interface';}
"void"						{ListaTokens.push(new Token('Reservada_void', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_void';}
"int"						{ListaTokens.push(new Token('Reservada_int', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_int';}
"double"					{ListaTokens.push(new Token('Reservada_double', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_double';}
"char"						{ListaTokens.push(new Token('Reservada_char', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_char';}
"String"					{ListaTokens.push(new Token('Reservada_String', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_String';}
"boolean"					{ListaTokens.push(new Token('Reservada_boolean', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_boolean';}
"for"						{ListaTokens.push(new Token('Reservada_for', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_for';}
"while"						{ListaTokens.push(new Token('Reservada_while', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_while';}
"System.out.println"		{ListaTokens.push(new Token('Reservada_println', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_println';}
"System.out.print"			{ListaTokens.push(new Token('Reservada_print', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_print';}
"do"						{ListaTokens.push(new Token('Reservada_do', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_do';}
"if"						{ListaTokens.push(new Token('Reservada_if', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_if';}
"else"						{ListaTokens.push(new Token('Reservada_else', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_else';}
"break"						{ListaTokens.push(new Token('Reservada_break', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_break';}
"continue"					{ListaTokens.push(new Token('Reservada_continue', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_continue';}
"return"					{ListaTokens.push(new Token('Reservada_return', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_return';}
"static"					{ListaTokens.push(new Token('Reservada_static', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_static';}
"main"						{ListaTokens.push(new Token('Reservada_main', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_main';}
"args"						{ListaTokens.push(new Token('Reservada_args', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_args';}
"true"						{ListaTokens.push(new Token('Reservada_true', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_true';}
"false"						{ListaTokens.push(new Token('Reservada_false', yytext, yylloc.first_line, yylloc.first_column)); return 'Reservada_false';}

'&&'						{ListaTokens.push(new Token('Simbolo_AND', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_AND';}
'||'						{ListaTokens.push(new Token('Simbolo_OR', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_OR';}
'++'						{ListaTokens.push(new Token('Simbolo_Adicion', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Adicion';}
'+'							{ListaTokens.push(new Token('Simbolo_Mas', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Mas';}
'--'						{ListaTokens.push(new Token('Simbolo_Sustraccion', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Sustraccion';}
'-'							{ListaTokens.push(new Token('Simbolo_Menos', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Menos';}
'*'							{ListaTokens.push(new Token('Simbolo_Asterisco', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Asterisco';}
'/'							{ListaTokens.push(new Token('Simbolo_Diagonal', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Diagonal';}
'=='						{ListaTokens.push(new Token('Simbolo_Comparacion', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Comparacion';}
'='							{ListaTokens.push(new Token('Simbolo_Igual', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Igual';}
'>='						{ListaTokens.push(new Token('Simbolo_Mayor_Igual', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Mayor_Igual';}
'>'							{ListaTokens.push(new Token('Simbolo_Mayor', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Mayor';}
'<='						{ListaTokens.push(new Token('Simbolo_Menor_Igual', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Menor_Igual';}
'<'							{ListaTokens.push(new Token('Simbolo_Menor', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Menor';}
'!='						{ListaTokens.push(new Token('Simbolo_Distinto', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Distinto';}
'!'							{ListaTokens.push(new Token('Simbolo_Negación', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Negación';}
'{'							{ListaTokens.push(new Token('Simbolo_Abrir_LLaves', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Abrir_LLaves';}
'}'							{ListaTokens.push(new Token('Simbolo_Cerrar_LLaves', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Cerrar_LLaves';}
'('							{ListaTokens.push(new Token('Simbolo_Abrir_Parentesis', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Abrir_Parentesis';}
')'							{ListaTokens.push(new Token('Simbolo_Cerrar_Parentesis', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Cerrar_Parentesis';}
';'							{ListaTokens.push(new Token('Simbolo_Punto_Y_Coma', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Punto_Y_Coma';}
'.'							{ListaTokens.push(new Token('Simbolo_Punto', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Punto';}
','							{ListaTokens.push(new Token('Simbolo_Coma', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Coma';}
'['							{ListaTokens.push(new Token('Simbolo_Abrir_Corchete', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Abrir_Corchete';}
']'							{ListaTokens.push(new Token('Simbolo_Cerrar_Corchete', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Cerrar_Corchete';}
'^'							{ListaTokens.push(new Token('Simbolo_Xor', yytext, yylloc.first_line, yylloc.first_column)); return 'Simbolo_Xor';}

\"[^\"]*\"					{yytext = yytext.substr(1,yyleng-2); ListaTokens.push(new Token('Cadena', yytext, yylloc.first_line, yylloc.first_column)); return 'Cadena'; }
\'[^\"]\'					{yytext = yytext.substr(1,yyleng-2); ListaTokens.push(new Token('Caracter', yytext, yylloc.first_line, yylloc.first_column)); return 'Caracter'; }
[0-9]+("."[0-9]+)?\b 	 	{ListaTokens.push(new Token('Decimal', yytext, yylloc.first_line, yylloc.first_column)); return 'Decimal';}
[0-9]+\b					{ListaTokens.push(new Token('Entero', yytext, yylloc.first_line, yylloc.first_column)); return 'Entero';}
([a-zA-Z])[a-zA-Z0-9_]*		{ListaTokens.push(new Token('ID', yytext, yylloc.first_line, yylloc.first_column)); return 'ID';}


<<EOF>>				return 'EOF';
.					{ ListaErrores.push(new Error('Lexico', yytext, "Simbolo no perteneciente al lenguaje", yylloc.first_line, yylloc.first_column));}

/lex


%{
	var traductor= "";
%}


/* Asociación de operadores y precedencia */
%left 'CONCAT'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start Inicio

%% /* Definición de la gramática */

Inicio
	: Lista 
	{
		$$=new Nodo("Inicio","");
        $$.Hijos.push($1);
        Raiz=$$;
        var retorno={
			raiz:Raiz,
			Errores: ListaErrores,
			Tokens: ListaTokens
        };
        ListaErrores = new Array();
        ListaTokens = new Array();
        return retorno;
	}
;

Lista
	: Reservada_public Selector Lista	{$$=new Nodo("Lista", "");
										$$.Hijos.push(new Nodo("Reservada_public", ""));
										$$.Hijos.push($2);
										$$.Hijos.push($3);} 
	| EOF   { $$=new Nodo("Lista", "");}

	| error Simbolo_Cerrar_LLaves Lista { $$ = new Nodo("Lista",""); 
    	$$.Hijos.push(new Nodo("Error", ""));  
		$$.Hijos.push($3);
        ListaErrores.push(new Error("Sintactico", $1, "Token inesperado", this._$.first_line, this._$.first_column));}
;

Selector
	: Reservada_class ID Simbolo_Abrir_LLaves ListaMetodos 	{$$=new Nodo("Selector", ""); 
															$$.Hijos.push(new Nodo("Reservada_class", "class ")); 
															$$.Hijos.push(new Nodo("ID", $2));
															$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{\n"));
															$$.Hijos.push($4);}

	| Reservada_interface ID Simbolo_Abrir_LLaves ListaDefiniones {$$=new Nodo("SelectorI", ""); 
																	$$.Hijos.push(new Nodo("Reservada_interface", "")); 
																	$$.Hijos.push(new Nodo("ID", ""));
																	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", ""));
																	$$.Hijos.push($4);
																	;}
;

ListaMetodos

	: Simbolo_Cerrar_LLaves	{$$=new Nodo("ListaMetodos", ""); $$.Hijos.push(new Nodo("Simbolo_Cerrar_LLaves", "\n}\n\n"));}

	| Reservada_public SelectorMetodo ListaMetodos 	{$$=new Nodo("ListaMetodos", "");
													$$.Hijos.push(new Nodo("Reservada_public", ""));
													$$.Hijos.push($2);
													$$.Hijos.push($3);}

	| TiposVariables Declaracion ListaMetodos	{$$=new Nodo("ListaMetodos", "");
								$$.Hijos.push($1);
								$$.Hijos.push($2);
								$$.Hijos.push($3);}

	| error RecuperacionM ListaMetodos { $$ = new Nodo("ListaMetodos",""); 
    	$$.Hijos.push(new Nodo("Error", ""));  
		$$.Hijos.push($3);
        ListaErrores.push(new Error("Sintactico", yytext, "Token inesperado", this._$.first_line, this._$.first_column));}
;

RecuperacionM
	: Simbolo_Punto_Y_Coma {$$=new Nodo("RecuperacionM", "");}
	| Simbolo_Cerrar_LLaves {$$=new Nodo("RecuperacionM", "");}
;

SelectorMetodo

	: Reservada_static Reservada_void Reservada_main Simbolo_Abrir_Parentesis Reservada_String Simbolo_Abrir_Corchete Simbolo_Cerrar_Corchete Reservada_args Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("SelectorMetodo", "");
	$$.Hijos.push(new Nodo("Reservada_static", "function "));
    $$.Hijos.push(new Nodo("Reservada_void", ""));
	$$.Hijos.push(new Nodo("Reservada_main", "main"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push(new Nodo("Reservada_String", ""));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Corchete", ""));
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Corchete", ""));
	$$.Hijos.push(new Nodo("Reservada_args", ""));
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{\n"));
	$$.Hijos.push($11);}

	| Reservada_void ID Simbolo_Abrir_Parentesis ListaParametros Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("SelectorMetodo", "");
	$$.Hijos.push(new Nodo("Reservada_void", "function "));
	$$.Hijos.push(new Nodo("ID", $2));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($4);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{\n"))
	$$.Hijos.push($7);}

	| TiposVariables ID Simbolo_Abrir_Parentesis ListaParametros Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("SelectorMetodo", "");
	$$.Hijos.push($1);
	$$.Hijos[0].Hijos[0].Traduccion = "function ";
	$$.Hijos.push(new Nodo("ID", $2));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($4);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{\n"));
	$$.Hijos.push($7);}
;

ListaParametros
	: TiposVariables ID ListaParametrosP{$$=new Nodo("ListaParametros", "");
	$$.Hijos.push($1);
	$$.Hijos[0].Hijos[0].Traduccion = "";
	$$.Hijos.push(new Nodo("ID", $2));
	$$.Hijos.push($3);}

	| {$$=new Nodo("ListaParametros", "");}
;

ListaParametrosP
	: Simbolo_Coma TiposVariables ID ListaParametrosP	{$$=new Nodo("ListaParametrosP", "");
	$$.Hijos.push(new Nodo("Simbolo_Coma", ", "));
	$$.Hijos.push($2);
	$$.Hijos[1].Hijos[0].Traduccion = "";
	$$.Hijos.push(new Nodo("ID", $3));
	$$.Hijos.push($4);}

	| {$$=new Nodo("ListaParametrosP", "");}
;

TiposVariables
	: Reservada_int {$$=new Nodo("TiposVariables", ""); $$.Hijos.push(new Nodo("Reservada_int", "var "));}
	| Reservada_double {$$=new Nodo("TiposVariables", ""); $$.Hijos.push(new Nodo("Reservada_double", "var "));}
	| Reservada_char {$$=new Nodo("TiposVariables", ""); $$.Hijos.push(new Nodo("Reservada_char", "var "));}
	| Reservada_String {$$=new Nodo("TiposVariables", ""); $$.Hijos.push(new Nodo("Reservada_String", "var "));}
	| Reservada_boolean {$$=new Nodo("TiposVariables", ""); $$.Hijos.push(new Nodo("Reservada_boolean", "var "));}
;

ListaIntrucciones

	: Simbolo_Cerrar_LLaves {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push(new Nodo("Simbolo_Cerrar_LLaves", "\n}\n\n"));}

	| TiposVariables Declaracion ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push($1); $$.Hijos.push($2); $$.Hijos.push($3);}
	
	| ID SelectorID ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push(new Nodo("ID", $1)); $$.Hijos.push($2); $$.Hijos.push($3);}

	| Reservada_return ValoresReturn ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); 
	$$.Hijos.push(new Nodo("Reservada_return", "return")); 
	$$.Hijos.push($2); $$.Hijos.push($3);}

	| Reservada_continue Simbolo_Punto_Y_Coma ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); 
	$$.Hijos.push(new Nodo("Reservada_continue", "continue")); 
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));
	$$.Hijos.push($3);}

	| Reservada_break Simbolo_Punto_Y_Coma ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); 
	$$.Hijos.push(new Nodo("Reservada_continue", "break")); 
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));
	$$.Hijos.push($3);}

	| Reservada_print Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Simbolo_Punto_Y_Coma ListaIntrucciones{$$=new Nodo("ListaInstrucciones", ""); 
	$$.Hijos.push(new Nodo("Reservada_print", "Console.log")); 
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($3);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));
	$$.Hijos.push($6);}

	| Reservada_println Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Simbolo_Punto_Y_Coma ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); 
	$$.Hijos.push(new Nodo("Reservada_println", "Console.log")); 
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($3);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));
	$$.Hijos.push($6);}

	| SentenciaIF ListaIntrucciones{$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push($1); $$.Hijos.push($2);}

	| SentenciaFor ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push($1); $$.Hijos.push($2);}

	| SentenciaWhile ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push($1); $$.Hijos.push($2);}

	| SentenciaDo ListaIntrucciones {$$=new Nodo("ListaInstrucciones", ""); $$.Hijos.push($1); $$.Hijos.push($2);}

	| error RecuperacionI { $$ = new Nodo("ListaIntrucciones",""); 
    	$$.Hijos.push(new Nodo("Error", ""));  
		$$.Hijos.push($2);
        ListaErrores.push(new Error("Sintactico", $1, "Token inesperado", this._$.first_line, this._$.first_column));}

;

RecuperacionI
	: Simbolo_Cerrar_LLaves { $$ = new Nodo("Simbolo_Cerrar_LLaves", "}");}
	| Simbolo_Punto_Y_Coma ListaIntrucciones {$$ = $2}
;

Declaracion
	: ID DeclaracionP Simbolo_Punto_Y_Coma {$$=new Nodo("Declaracion", "");
	$$.Hijos.push(new Nodo("ID", $1));
	$$.Hijos.push($2);
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}
;

DeclaracionP
	: Simbolo_Coma ID DeclaracionP {$$=new Nodo("DeclaracionP", "");
	$$.Hijos.push(new Nodo("Simbolo_Coma", ", "));
	$$.Hijos.push(new Nodo("ID", $2));
	$$.Hijos.push($3);}

	| Simbolo_Igual Expresion DeclaracionBP {$$=new Nodo("DeclaracionP", "");
	$$.Hijos.push(new Nodo("Simbolo_Igual", " = "));
	$$.Hijos.push($2);
	$$.Hijos.push($3);}

	| {$$=new Nodo("DeclaracionP", "");}
;

DeclaracionBP
	: Simbolo_Coma ID DeclaracionP {$$=new Nodo("DeclaracionBP", "");
	$$.Hijos.push(new Nodo("Simbolo_Coma", ", "));
	$$.Hijos.push(new Nodo("ID", $2));
	$$.Hijos.push($3);}

	| {$$=new Nodo("DeclaracionBP", "");}
;

Expresion
	: Simbolo_Mas Exp {$$=new Nodo("Expresion", "");
	$$.Hijos.push(new Nodo("Simbolo_Mas", "+"));
	$$.Hijos.push($2);}

	| Simbolo_Menos Exp {$$=new Nodo("Expresion", "");
	$$.Hijos.push(new Nodo("Simbolo_Menos", "-"));
	$$.Hijos.push($2);}

	| Exp {$$=new Nodo("Expresion", "");
	$$.Hijos.push($1);}
;

Exp
	: Entero Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Entero", $1)); $$.Hijos.push($2);}
	| Decimal Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Decimal", $1)); $$.Hijos.push($2);}
	| Cadena Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Cadena", '"' + $1 + '"')); $$.Hijos.push($2);}
	| Caracter Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Caracter", "'" + $1 + "'")); $$.Hijos.push($2);}
	| Reservada_true Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Reservada_true", $1)); $$.Hijos.push($2);}
	| Reservada_false Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Reservada_false", $1)); $$.Hijos.push($2);}
	| ID PosibilidadMetodo Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("ID", $1)); $$.Hijos.push($2); $$.Hijos.push($3);}
	| Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Operador {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "(")); $$.Hijos.push($2); $$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")")); $$.Hijos.push($4);}
	| Simbolo_Negación Exp {$$=new Nodo("Exp", ""); $$.Hijos.push(new Nodo("Simbolo_Negación", $1)); $$.Hijos.push($2);}
;

RecuperacionE
	: Simbolo_Punto_Y_Coma { $$ = new Nodo("Declaracion","");}
	| Simbolo_Cerrar_Parentesis { $$ = new Nodo("Declaracion","");}
;

Operador
	: Simbolo_Mas Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Mas", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Menos Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Menos", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Asterisco Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Asterisco", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Diagonal Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Diagonal", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Adicion Operador {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Adicion", $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Sustraccion Operador {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Sustraccion", $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Comparacion Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Comparacion", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Mayor Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Mayor", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Mayor_Igual Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Mayor_Igual", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Menor Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Menor", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Menor_Igual Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Menor_Igual", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Distinto Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Distinto", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_AND Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_AND", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_OR Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_OR", " " + $1 + " ")); $$.Hijos.push($2);}
	| Simbolo_Xor Exp {$$=new Nodo("Operador", ""); $$.Hijos.push(new Nodo("Simbolo_Xor", " " + $1 + " ")); $$.Hijos.push($2);}
	| {$$=new Nodo("Operador", "");}
;

PosibilidadMetodo
	: Simbolo_Abrir_Parentesis ListaValores Simbolo_Cerrar_Parentesis {$$=new Nodo("PosibilidadMetodo", ""); $$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "(")); $$.Hijos.push($2); $$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));}
	| {$$=new Nodo("PosibilidadMetodo", "");}
;

ListaValores
	: Expresion ListaValoresP {$$=new Nodo("ListaValores", ""); $$.Hijos.push($1); $$.Hijos.push($2);}
	| {$$=new Nodo("ListaValores", "");}
;

ListaValoresP
	: Simbolo_Coma Expresion ListaValoresP {$$=new Nodo("ListaValoresP", ""); $$.Hijos.push(new Nodo("Simbolo_Coma", ", ")); $$.Hijos.push($2); $$.Hijos.push($3);}
	| {$$=new Nodo("ListaValoresP", "");}
;

SelectorID
	: Simbolo_Abrir_Parentesis ListaValores Simbolo_Cerrar_Parentesis Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorID", ""); $$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "(")); $$.Hijos.push($2); $$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")")); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}

	| Simbolo_Igual Expresion Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorID", ""); $$.Hijos.push(new Nodo("Simbolo_Igual", "=")); $$.Hijos.push($2); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}

	| Simbolo_Adicion Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorID", ""); $$.Hijos.push(new Nodo("Simbolo_Adicion", "++")); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}

	| Simbolo_Sustraccion Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorID", ""); $$.Hijos.push(new Nodo("Simbolo_Sustraccion", "--")); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}
;

ValoresReturn
	: Expresion Simbolo_Punto_Y_Coma {$$=new Nodo("ValoresReturn", " "); $$.Hijos.push($1); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}

	| Simbolo_Punto_Y_Coma {$$=new Nodo("ValoresReturn", ""); $$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}


;

SentenciaIF
	: Reservada_if Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones CaminosIF {$$=new Nodo("SentenciaIF", "");  
	$$.Hijos.push(new Nodo("Reservada_if", "if "));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($3);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{"));
	$$.Hijos.push($6);
	$$.Hijos.push($7);}
;

CaminosIF
	: Reservada_else OpcionElse {$$=new Nodo("CaminosIF", "");
	$$.Hijos.push(new Nodo("Reservada_else", "else\n"));
	$$.Hijos.push($2);}
	| 
;

OpcionElse
	: SentenciaIF {$$=new Nodo("OpcionElse", ""); $$.Hijos.push($1);}
	|  Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("OpcionElse", ""); 
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{\n"));
	$$.Hijos.push($2);}
;

SentenciaFor
	: Reservada_for Simbolo_Abrir_Parentesis TiposVariables Declaracion Expresion Simbolo_Punto_Y_Coma Expresion Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("SentenciaFor", ""); 
	$$.Hijos.push(new Nodo("Reservada_for", "for"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($3);
	$$.Hijos.push($4);
	$$.Hijos[3].Hijos[2].Traduccion = ";";
	$$.Hijos.push($5);
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", ";"));
	$$.Hijos.push($7);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{"));
	$$.Hijos.push($10);}
;

SentenciaWhile
	: Reservada_while Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Simbolo_Abrir_LLaves ListaIntrucciones {$$=new Nodo("SentenciaWhile", ""); 
	$$.Hijos.push(new Nodo("Reservada_while", "while"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($3);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{"));
	$$.Hijos.push($6);}
;

SentenciaDo
	: Reservada_do Simbolo_Abrir_LLaves ListaIntrucciones Reservada_while Simbolo_Abrir_Parentesis Expresion Simbolo_Cerrar_Parentesis Simbolo_Punto_Y_Coma {$$=new Nodo("SentenciaDo", ""); 
	$$.Hijos.push(new Nodo("Reservada_do", "do"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_LLaves", "{"));
	$$.Hijos.push($3);
	$$.Hijos.push(new Nodo("Reservada_while", "while"));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", "("));
	$$.Hijos.push($6);
	$$.Hijos.push(new Nodo("Simbolo_Cerrar_Parentesis", ")"));
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", "\n"));}
;


ListaDefiniones
	: Declaracion ListaDefiniones{$$=new Nodo("ListaDefiniones", "");
	$$.Hijos.push($1);
	$$.Hijos.push($2);}

	| Reservada_public SelectorDefincion ListaDefiniones {$$=new Nodo("ListaDefiniones", "");
	$$.Hijos.push(new Nodo("Reservada_public", ""));
	$$.Hijos.push($2);
	$$.Hijos.push($3);}

	| Simbolo_Cerrar_LLaves	{$$=new Nodo("ListaDefiniones", ""); $$.Hijos.push(new Nodo("Simbolo_Cerrar_LLaves", "}\n\n"));}

	| error RecuperacionM { $$ = new Nodo("ListaDefiniones",""); 
    	$$.Hijos.push(new Nodo("Error", ""));  
		$$.Hijos.push($2);
        ListaErrores.push(new Error("Sintactico", $1, "Token inesperado", this._$.first_line, this._$.first_column));}
;

RecuperacionD
	: Simbolo_Punto_Y_Coma ListaDefiniones {$$=$2}
	| Simbolo_Cerrar_LLaves {$$=new Nodo("RecuperacionM", "");}
;

SelectorDefincion
	: Reservada_void ID Simbolo_Abrir_Parentesis ListaParametros Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorDefincion", "");
	$$.Hijos.push(new Nodo("Reservada_void", ""));
	$$.Hijos.push(new Nodo("ID", ""));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", ""));
	$$.Hijos.push($4);
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", ""));}

	| TipoVariables ID Simbolo_Abrir_Parentesis ListaParametros Simbolo_Punto_Y_Coma {$$=new Nodo("SelectorDefincion", "");
	$$.Hijos.push($1);
	$$.Hijos.push(new Nodo("ID", ""));
	$$.Hijos.push(new Nodo("Simbolo_Abrir_Parentesis", ""));
	$$.Hijos.push($4);
	$$.Hijos.push(new Nodo("Simbolo_Punto_Y_Coma", ""));}
;