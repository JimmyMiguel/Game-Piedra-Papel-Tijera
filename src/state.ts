

export type Opcion = "piedra" | "papel" | "tijera";



const state = {
  
listener: [] as Function[],

resultado: "" as string,

partidasGanadas: {
  userComputer: 0 as number,
  userJugador:0 as number
}
,

winGame(jugador:Opcion, computadora:string):string{
 
 if (jugador === computadora) return "Empate";

  if (
    (jugador === "piedra" && computadora === "tijera") ||
    (jugador === "papel" && computadora === "piedra") ||
    (jugador === "tijera" && computadora === "papel")
  ) {
    this.partidasGanadas.userJugador++
    return "Ganaste"  


  } else {
    this.partidasGanadas.userComputer++
    return  "Perdiste"
  }
},


//regresa el estado de las partidas para ponerlas en mi componente
getState() {
  return this.partidasGanadas
}
,



  setState(accionJugador:Opcion, accionCompu:string) {

    const resultado = this.winGame(accionJugador, accionCompu)
    this.resultado =resultado
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