//obj
const cartes = document.getElementById("cartes")
const letras = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"];
const botoInstruccions = document.getElementById("botoInstruccions")
const nom = document.getElementById("nomJugador")
const puntuacio = document.getElementById("puntuacio")
const millorJugador = document.getElementById("millorJugador")
const millorPuntuacio = document.getElementById("millorPuntuacio")


//variables i constants
let parell = [];
let lletraJugada;
let obj1;
let obj2;
let contParelles=0;
let score=0;
const canal = new BroadcastChannel('canal');
const colorFonsGuardat = sessionStorage.getItem("colorFons");

let millorPuntuacioGuardada = localStorage.getItem("millorPuntuacio");
let millorJugadorGuardat = localStorage.getItem("millorJugador");

//events
botoInstruccions.addEventListener("click",obrirInstruccions)

//funcions

//actualizta totes les dades de la nova partida
function canviDades(){
    //enviar la puntuacio per a que aparegui com a 0 des del començament
    canal.postMessage(puntuacio.innerText);

    //canvi nomJugador 
    let nomJ = document.cookie
    let index = nomJ.indexOf("=")+1
    
    nomJ=nomJ.slice(index,nomJ.length)
    nom.innerText=nomJ

    //canvi color
    if (colorFonsGuardat) {
        document.body.style.backgroundColor = colorFonsGuardat;
    }

    //controla si hi ha registres previs de puntuacio i els canvia
    if(millorJugadorGuardat && millorPuntuacioGuardada){
        millorPuntuacio.innerText = millorPuntuacioGuardada;
        millorJugador.innerText = millorJugadorGuardat;
    }
}
canviDades()

//genera les cartes per jugar
function crearCartes(){
    let lletresBarrejades = letras.sort((()=>Math.random()-0.5))
    for(let i=0;i<letras.length;i++){
        const carta = document.createElement("button")
        carta.textContent=letras[i]
        carta.id="carta_"+(i+1)
        carta.className="cartes"
        cartes.appendChild(carta)
        carta.addEventListener("click", function() {
            jugarCarta(carta); 
        });
    }
}

crearCartes()

//controla cada jugada de carta
function jugarCarta(obj){

    lletraJugada = obj.textContent
    parell.push(lletraJugada)
    obj.style.color="#000000"
    obj.style.backgroundColor="#D3D3D3"
    obj.disabled=true

    //guarda objectes de dos en dos
    if(!obj1){
        obj1 = obj
    }else{
        obj2 = obj
    }

    //cuan s'han jugat dos cartes
    if (parell.length==2) {
        //si fas parella
        if(parell[0]==parell[1]){ 
            encert()
            //reinicia els obj per les cartes següents
            obj1=null
            obj2=null
        //si no fas parella
        }else{
            //restar puntuacio i evita negatiu
            score-=3
            puntuacio.innerText= String(score)
            if (score<0) {
                score=0
                puntuacio.innerText=0
            }

            //gira les cartes amb una mica de delay y reset obj
            setTimeout(() => {
                girarCartes()
                obj1=null
                obj2=null
            }, 500); 
        } 
        //buida l'array de parella i envia la puntuació al final de torn
        parell=[] 
        canal.postMessage(puntuacio.innerText);
    } 
}


//dona la volta les cartes jugades al fallar
function girarCartes(){
    //mostrar lletra
    obj1.style.color="#00000000"
    obj2.style.color="#00000000"
    //fons gris
    obj1.style.backgroundColor="#00FFFF"
    obj2.style.backgroundColor="#00FFFF"
    //reactivar botons
    obj1.disabled=false
    obj2.disabled=false
}

//fas parella
function encert(){
    contParelles++
    score+=10
    puntuacio.innerText= String(score)
    //acaba la partida amb 10 parelles
    if (contParelles==10) {
        millor()
        window.location.assign("partidaFinalitzada.html")
    }
}

//pagina d'instruccions
function obrirInstruccions(){
    window.open("instruccions.html","instruccions","width=500,height=400")
}

//control de millor partida
function millor(){
    //actualitza si es millora la puntuació y guarda les dades a localStorage
    if(score>parseInt(millorPuntuacio.innerText)){
        millorPuntuacio.innerText=score
        millorJugador.innerText=nom.innerText
        localStorage.setItem("millorPuntuacio",millorPuntuacio.innerText);
        localStorage.setItem("millorJugador",millorJugador.innerText);

    }
}

