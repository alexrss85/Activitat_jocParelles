//OBJECTES
const botoPartida = document.getElementById("button-partida");
const botoBorrar = document.getElementById("button-borrar");
const nomJugadorObj = document.getElementById("nom-jugador");
const infoNavegadorObj = document.getElementById("info-navegador")
const infoUrlObj = document.getElementById("info-url")
const infoPartida = document.getElementById("info-partidaActual")


//EVENTS
botoPartida.addEventListener("click",comencarPartida)
botoBorrar.addEventListener("click",borrarPartida)
//VARIABLES I CONSTANTS
let win;
let punts = 0;
let colorFons;
const canal = new BroadcastChannel('canal');

//FUNCIONS

//inici
function comencarPartida(){
    //si ja hi ha una finestra de partida, no començarà una nova i mostrarà alerta
    if(win){
        win.alert("Partida ja començada");
        //mostra la finestra del joc
        win.focus();
        return;
    }
    //si el camp esta informat
    if(nomJugadorObj.value){
        //obre la pestanya de joc
        win= window.open("joc.html","joc","width=800,height=1000")
        let cookie = document.cookie = "nomJugador="+nomJugadorObj.value
        //rep el missatge i actualitza la informacio de partida
        canal.onmessage = (event) => {
            punts = event.data
            infoPartidaActual()
        };
    }else{
        alert("Informa nom de jugador")
        
    }
}

//acaba la partida en curs
function borrarPartida(){
    win = win.close();
    infoPartida.innerText= "No hi ha cap partida en joc"
}

//mostra l'info del navegador
function infoNavegador(){
    //canviar text infoNav
    const usrAgent = navigator.userAgent
    infoNavegadorObj.textContent =  usrAgent

    //cambiar color fons depenent el navegador
    if (usrAgent.includes("Firefox")) {
        colorFons = "orange"; 
    } else if (usrAgent.includes("Chrome")) {
        colorFons = "#a4eda5"; 
    } else {
        colorFons = "white"; 
    }
    
    //guardar el color a sessionStorage
    sessionStorage.setItem("colorFons", colorFons);
}

//mostra l'info de la URL
function infoUrl(){
    const url = window.location.origin;
    infoUrlObj.textContent = url
}

//canvia les dades de partida
function infoPartidaActual(){
    infoPartida.innerText= "Nom: "+nomJugadorObj.value+", Punts: "+punts+",  Estat Partida: En joc "
}

infoUrl()
infoNavegador()