//obj
const cartes = document.getElementById("cartes")
const letras = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"];
//parelles
let parell = [];
let lletraJugada;


//funcions

function crearCartes(){
    let lletresBarrejades = letras.sort((()=>Math.random()-0.5))
    for(let i=0;i<letras.length;i++){
        const carta = document.createElement("button")
        carta.textContent=lletresBarrejades[i]
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

    if (parell.length==2) {
        if(parell[0]==parell[1]){
            alert("Parella")    
        }else{
            setTimeout(() => {
                obj.style.color="#00000000"
            }, 1000);
    
        } 
        parell=[] 
    }   
}

