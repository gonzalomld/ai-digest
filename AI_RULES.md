# AI_RULES.md — Guía de Desarrollo para AI Digest

Este documento establece el stack tecnológico y las reglas de implementación para asegurar la consistencia y ligereza del proyecto.

## Stack Tecnológico
- **HTML5:** Uso de etiquetas semánticas para la estructura principal.
- **CSS3 (Moderno):** Implementación de layouts mediante **CSS Grid** (para el calendario) y **Flexbox** (para la navegación y componentes).
- **Vanilla JavaScript (ES6+):** Lógica de frontend sin frameworks externos para garantizar un rendimiento óptimo.
- **Diseño Responsive:** Estrategias de "Mobile First" y adaptabilidad mediante media queries.
- **Iframe Sandboxing:** Uso de iframes para la previsualización segura de los digests diarios.
- **Arquitectura de Datos Simple:** Gestión de contenidos basada en un índice de objetos JSON/JS (`DIGESTS`).

## Reglas sobre Librerías y Dependencias

### 1. Estilos y UI
- **Regla:** No añadir frameworks de CSS externos (Tailwind, Bootstrap, etc.).
- **Razón:** Mantener el tiempo de carga bajo y evitar el exceso de selectores no utilizados. Todos los estilos deben ser personalizados y locales.

### 2. Frameworks de JavaScript
- **Regla:** Queda prohibido el uso de React, Vue, Angular o Svelte.
- **Razón:** El proyecto es una herramienta de visualización simple que no requiere la complejidad de un framework reactivo.

### 3. Gestión de Fechas
- **Regla:** Utilizar exclusivamente el objeto nativo `Date` de JavaScript.
- **Razón:** Evitar la carga innecesaria de librerías como Moment.js o Day.js para operaciones de calendario básicas.

### 4. Iconografía
- **Regla:** Priorizar el uso de **Emojis** o **SVG inline**.
- **Razón:** Elimina la necesidad de peticiones HTTP adicionales para fuentes de iconos (como FontAwesome).

### 5. Gestión de Estado y Datos
- **Regla:** Los datos de los nuevos resúmenes deben integrarse en el objeto `DIGESTS` dentro de `index.html` o un archivo de datos local específico. No usar bases de datos externas ni clientes de API complejos.

### 6. Manipulación del DOM
- **Regla:** Usar métodos nativos como `document.getElementById`, `querySelector` y `createElement`. No incluir jQuery.
