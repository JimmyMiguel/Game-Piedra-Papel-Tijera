import "./pages/ready";
import "./pages/welcome";
import "./pages/game"
import "./pages/ganador"
// --- Tipos y Rutas (a nivel de módulo) ---
type Route = {
  path: RegExp;
  action: () => Element;
};

//todas las rutas
const routes: Route[] = [
  {
    path: /^\/$/,
    action: () => {
      const readycom = document.createElement("welcome-page")
      return readycom


    },
  },
  {
    path: /^\/readycom$/,
    action: () => {
      const readycom = document.createElement("ready-com");
      return readycom;
    },
  },
  {
    path: /^\/gameCom$/,
    action: () => {
      const readycom = document.createElement("game-com");
      return readycom;
    },
  },
  {
    path: /^\/ganador$/,
    action: () => {
      const ganadorCom = document.createElement("game-over-screen");
      return ganadorCom;
    },
  },

];

let container: Element | null = null;

export function handleRoute(path: string) {
  if (!container) {
    console.error("Container not initialized!");
    return;
  }

  for (const route of routes) {
    if (route.path.test(path)) {
      container.innerHTML = "";
      const newElement = route.action();
      container.appendChild(newElement);
      return;
    }
  }
  console.log("No route matched, showing 404");
  container.innerHTML = "<h2>404 - Página no encontrada</h2>";
}

export function goTo(path: string) {
  history.pushState({}, "", path);
  handleRoute(path);
}


//funtion para iniciar ruta
export function initRouter(mainContainer: Element) {
  container = mainContainer;

  window.addEventListener("popstate", () => {
    handleRoute(location.pathname);
  });

  handleRoute(location.pathname);
}
