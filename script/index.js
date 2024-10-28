//OBJECTES
const botoPartida = document.getElementById("button-partida");
const botoBorrar = document.getElementById("button-borrar");
const nomJugadorObj = document.getElementById("nom-jugador");
const infoNavegadorObj = document.getElementById("info-navegador")
const infoUrlObj = document.getElementById("info-url")

//EVENTS
botoPartida.addEventListener("click",comencarPartida)
botoBorrar.addEventListener("click",borrarPartida)
//VARIABLES I CONSTANTS
let win;

//FUNCIONS
function comencarPartida(){
    if(nomJugadorObj.value){
        win= window.open("joc.html","joc","width=1000,height=1000")
        localStorage.setItem("nom","oriol")
    }else{
        alert("informa nom de jugador")
        
    }
}


function borrarPartida(){
    win.close();
}

function infoNavegador(){
    const color = "orange";

    const usrAgent = navigator.userAgent
    infoNavegadorObj.textContent =  usrAgent

    if (usrAgent.includes("5")) {
        infoNavegadorObj.style.color= color
    }
}

function infoUrl(){
    const url = window.location.origin;
    infoUrlObj.textContent = url
}


infoUrl()
infoNavegador()