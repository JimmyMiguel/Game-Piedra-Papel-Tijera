

export type Opcion = "piedra" | "papel" | "tijera";



const state = {
  
listener: [] as Function[],



partidasGanadas: {
  userComputer: 0,
  userJugador:0
}
,

winGame(jugador:Opcion, computadora:Opcion){
 
 if (jugador === computadora) return "Empate";

  if (
    (jugador === "piedra" && computadora === "tijera") ||
    (jugador === "papel" && computadora === "piedra") ||
    (jugador === "tijera" && computadora === "papel")
  ) {
    return this.partidasGanadas.userJugador+1;


  } else {
    return  this.partidasGanadas.userComputer+1;
  }
},


//regresa el estado de las partidas para ponerlas en mi componente
getState() {
  return this.partidasGanadas
}
,



  setState(accionJugador:Opcion, accionCompu:Opcion) {

    this.winGame(accionJugador, accionCompu)
    for (const callback of this.listener) {
      callback();
    }
    }
,


  subscribe(callback: Function) {
    this.listener.push(callback);

  },
};

export { state };