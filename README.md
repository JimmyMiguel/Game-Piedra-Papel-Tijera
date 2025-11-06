# 🎮 Piedra, Papel o Tijera

Un juego clásico implementado como una aplicación web moderna utilizando TypeScript y Web Components.

## 🚀 Demo

Puedes jugar al juego aquí: [Game-Piedra-Papel-Tijera](https://jimmymiguel.github.io/Game-Piedra-Papel-Tijera/)

## 🛠 Tecnologías Utilizadas

- TypeScript
- Web Components (Custom Elements)
- Vite
- Shadow DOM
- CSS Modules

## 🏗 Arquitectura

El proyecto sigue una arquitectura basada en componentes con las siguientes características:

```
src/
├── components/     # Componentes web reutilizables
│   ├── botonCom.ts
│   ├── papelCom.ts
│   ├── piedraCom.ts
│   └── tijeraCom.ts
├── pages/         # Páginas/vistas principales
│   ├── welcome.ts
│   ├── ready.ts
│   ├── game.ts
│   └── ganador.ts
├── router.ts      # Sistema de enrutamiento SPA
├── state.ts       # Manejo del estado del juego
└── main.ts        # Punto de entrada
```

### Características Principales

- **Web Components**: Utiliza Custom Elements para crear componentes reutilizables
- **Shadow DOM**: Encapsulamiento de estilos y estructura
- **Router**: Sistema de enrutamiento personalizado para SPA
- **State Management**: Manejo de estado para las puntuaciones y resultados del juego

## 📋 Prerrequisitos

- Node.js
- pnpm (gestor de paquetes)

## 🚀 Instalación

1. Clonar el repositorio:
   \`\`\`bash
   git clone https://github.com/JimmyMiguel/Game-Piedra-Papel-Tijera.git
   \`\`\`

2. Instalar dependencias:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Iniciar servidor de desarrollo:
   \`\`\`bash
   pnpm run dev
   \`\`\`

## 🏗 Construir para Producción

\`\`\`bash
pnpm run build
\`\`\`

## 📤 Despliegue

El proyecto está configurado para desplegarse en GitHub Pages:

\`\`\`bash
pnpm run deploy
\`\`\`

## 🎮 Cómo Jugar

1. Haz clic en "EMPEZAR"
2. En la pantalla de juego, selecciona tu jugada (piedra, papel o tijera)
3. Tienes 5 segundos para hacer tu elección
4. El resultado se mostrará en la siguiente pantalla
5. ¡Compite por el mejor puntaje!

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu característica
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
