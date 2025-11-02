

export type Opcion = "piedra" | "papel" | "tijera";



const state = {

  listener: [] as Function[],

  resultado: "" as string,

  partidasGanadas: {
    userComputer: 0 as number,
    userJugador: 0 as number
  }
  ,

  winGame(jugador: Opcion, computadora: string): string {

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
      return "Perdiste"
    }
  },


  //regresa el estado de las partidas para ponerlas en mi componente
  getState() {
    return this.partidasGanadas
  }
  ,



  setState(accionJugador: Opcion, accionCompu: string) {

    const resultado = this.winGame(accionJugador, accionCompu)
    this.resultado = resultado
    for (const callback of this.listener) {
      callback();
    }
    // Guarda automáticamente en localStorage después de actualizar los scores
    this.saveToLocalStorage();
  }
  ,

  // Guarda partidasGanadas en localStorage
  saveToLocalStorage() {
    try {
      const dataToSave = JSON.stringify(this.partidasGanadas);
      localStorage.setItem("game-scores", dataToSave);
    } catch (error) {
      // Si localStorage falla, no rompe el juego
      console.error("Error al guardar en localStorage:", error);
    }
  },

  // Carga partidasGanadas desde localStorage
  loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem("game-scores");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Valida que tenga la estructura correcta
        if (parsedData && typeof parsedData.userJugador === "number" && typeof parsedData.userComputer === "number") {
          this.partidasGanadas = parsedData;
        }
      }
    } catch (error) {
      // Si hay error, usa valores por defecto
      console.error("Error al cargar desde localStorage:", error);
    }
  },

};

// Carga los datos guardados al inicializar el módulo
state.loadFromLocalStorage();

export { state };