class Nodo{
    constructor(Tipo, Traduccion){
        this.Tipo = Tipo;
        this.Traduccion = Traduccion;
        this.Hijos = [];
    }

    Mostrar(){
        console.log(this.Tipo + ";" + this.Traduccion);
        for(this.i=0; this.i<this.Hijos.length; this.i++){
            if(this.Hijos[this.i] != undefined){
                this.cadena += this.Hijos[this.i].Mostrar();
            }
        }
        return this.cadena
    }

    Identar(){
        this.Cadena = this.Traducir();
        this.JS = ""
        this.Identado = 0;
        for(this.i=0;this.i<this.Cadena.length;this.i++){            
            if(this.Cadena[this.i] == "{"){
                this.Identado++
                this.JS += "{\n"
                for(this.j=0;this.j<this.Identado;this.j++){
                    this.JS += "\t";
                }
            }else if(this.Cadena[this.i] == "\n"){
                this.JS += "\n"
                for(this.j=0;this.j<this.Identado;this.j++){
                    this.JS += "\t";
                }
            }else if(this.Cadena[this.i] == "}"){
                this.Identado--
                this.JS += "\n"
                for(this.j=0;this.j<this.Identado;this.j++){
                    this.JS += "\t";
                }
                this.JS += "}\n"
                for(this.j=0;this.j<this.Identado;this.j++){
                    this.JS += "\t";
                }
            }else{
                this.JS += this.Cadena[this.i];
            }
        }
        return this.JS;
    }

    Traducir(){
        this.JS = "";
        if(this.Tipo != "SelectorI"){
            if(this.Tipo == "Simbolo_Abrir_LLaves"){
                this.JS += "{";
            }else if(this.Tipo == "\n"){
                this.JS += "\n";
            }else if(this.Tipo == "Simbolo_Cerrar_LLaves"){
                this.JS += "}";
            }else{
                this.JS += this.Traduccion;
            }
            for(this.i=0; this.i<this.Hijos.length; this.i++){
                if(this.Hijos[this.i] != undefined){
                    this.JS += this.Hijos[this.i].Traducir();
                }
            }
        }
        return this.JS;
    }

}
module.exports= Nodo;