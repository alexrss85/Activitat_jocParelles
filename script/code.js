//obj
const cartes = document.getElementById("cartes")
const letras = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"];
//parelles
let parell = [];
let lletraJugada;

let obj1;
let obj2;
let contParelles=0;


//funcions

function crearCartes(){
    // let lletresBarrejades = letras.sort((()=>Math.random()-0.5))
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


function jugarCarta(obj){

    lletraJugada = obj.textContent
    parell.push(lletraJugada)
    obj.style.color="#000000"

    if(!obj1){
        obj1 = obj
    }else{
        obj2 = obj
    }

    if (parell.length==2) {
        if(parell[0]==parell[1]){ 
            obj1=null
            obj2=null
            win()
        }else{
            setTimeout(() => {
                girarCartes()
                obj1=null
                obj2=null
            }, 1000); 
        } 
        parell=[] 
    } 
}

function girarCartes(){
    obj1.style.color="#00000000"
    obj2.style.color="#00000000"
}

function win(){
    contParelles++
    if (contParelles==10) {
        window.close()
    }
}

//LOCATION.ASSIGN PER REDIRECCIONAR A UNA PESTANYA AL ACABAR EL JOC

