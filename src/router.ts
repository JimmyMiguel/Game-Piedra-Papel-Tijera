import "./pages/ready";
import "./pages/welcome";
import "./pages/game";
import "./pages/ganador";
// --- Tipos y Rutas (a nivel de módulo) ---
type Route = {
  path: RegExp;
  action: () => Element;
};

//todas las rutas
// Base path debe ser el path dentro del pathname (ruta del repo), no el dominio
const BASE_PATH = "/Game-Piedra-Papel-Tijera";

const routes: Route[] = [
  {
    path: new RegExp(`^${BASE_PATH}/?$`),
    action: () => {
      const readycom = document.createElement("welcome-page");
      return readycom;
    },
  },
  {
    path: new RegExp(`^${BASE_PATH}/readycom/?$`),
    action: () => {
      const readycom = document.createElement("ready-com");
      return readycom;
    },
  },
  {
    path: new RegExp(`^${BASE_PATH}/gameCom/?$`),
    action: () => {
      const readycom = document.createElement("game-com");
      return readycom;
    },
  },
  {
    path: new RegExp(`^${BASE_PATH}/ganador/?$`),
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
  // Acepta rutas relativas ("/readycom") o absolutas. Si la ruta no contiene
  // el BASE_PATH, la prefijamos automáticamente para que las llamadas existentes
  // como goTo('/readycom') sigan funcionando en GitHub Pages.
  let fullPath = path;
  if (!path.startsWith(BASE_PATH)) {
    fullPath = path.startsWith("/") ? BASE_PATH + path : BASE_PATH + "/" + path;
  }
  history.pushState({}, "", fullPath);
  handleRoute(fullPath);
}

//funtion para iniciar ruta
export function initRouter(mainContainer: Element) {
  container = mainContainer;

  window.addEventListener("popstate", () => {
    handleRoute(location.pathname);
  });

  handleRoute(location.pathname);
}
