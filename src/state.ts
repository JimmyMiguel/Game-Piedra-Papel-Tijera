

export type Opcion = "piedra" | "papel" | "tijera";



const state = {
  
listener: [] as Function[],



partidasGanadas: {
  userComputer: 0 as number,
  userJugador:0 as number
}
,

winGame(jugador:Opcion, computadora:string){
 
 if (jugador === computadora) return "Empate";

  if (
    (jugador === "piedra" && computadora === "tijera") ||
    (jugador === "papel" && computadora === "piedra") ||
    (jugador === "tijera" && computadora === "papel")
  ) {
    return  this.partidasGanadas.userJugador++


  } else {
    return  this.partidasGanadas.userComputer++
  }
},


//regresa el estado de las partidas para ponerlas en mi componente
getState() {
  return this.partidasGanadas
}
,



  setState(accionJugador:Opcion, accionCompu:string) {

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