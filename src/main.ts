import "./pages/welcome"
import "./pages/ready"
import "./routes"
import  "./routes"
import { initRouter } from "./routes"

(function main(){
  const root = document.getElementById("app")
  if (root) {
    initRouter(root)
  }


})()