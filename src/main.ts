import "./pages/welcome"
import "./pages/ready"
import "./router"
import "./router"
import { initRouter } from "./router"

(function main() {
  const root = document.getElementById("app")
  if (root) {
    initRouter(root)
  }


})()