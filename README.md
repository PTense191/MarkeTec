# 🏪 MarkeTec

**Plataforma de emprendedores del Instituto Tecnológico de Tijuana**

MarkeTec es un sitio web estático (HTML + CSS + JS puro) que permite a los estudiantes y egresados del ITT registrar y publicitar sus negocios, y a los compradores descubrir emprendimientos locales.

---

## 🗂️ Estructura de archivos

```
marketec/
├── index.html        # Catálogo principal con búsqueda y filtros
├── negocio.html      # Página de un negocio (menú, galería, reseñas, carrito)
├── registro.html     # Formulario de registro de negocio (4 pasos)
├── auth.html         # Login / Crear cuenta
├── dashboard.html    # Panel del emprendedor (gestionar su negocio)
├── admin.html        # Panel de administrador (aprobar / moderar)
├── marketec.js       # Capa de datos compartida (localStorage)
├── marketec.css      # Estilos globales
└── README.md
```

---

## ✨ Funcionalidades

### Para clientes / visitantes
- 🔍 Búsqueda de negocios por nombre o categoría
- 🏷️ Filtros por categoría, disponibilidad y calificación
- 📄 Página de detalle con menú, galería, horario semanal y reseñas
- 🟢 Indicador de disponibilidad en tiempo real
- 🛒 Carrito de compras para negocios que aceptan pedidos
- 💬 Envío de pedidos por WhatsApp
- ⭐ Sistema de reseñas con calificación por estrellas

### Para emprendedores
- 📝 Formulario de registro en 4 pasos (info, horario, menú/fotos, cuenta)
- 🖥️ Panel de gestión: editar info, horario, menú, galería
- 🟢 Toggle de disponibilidad instantáneo
- 📦 Seguimiento de pedidos recibidos
- ⭐ Ver reseñas de su negocio

### Para administradores
- 📊 Dashboard con estadísticas generales
- ⏳ Bandeja de solicitudes pendientes (aprobar / rechazar)
- 🏪 Tabla de todos los negocios con búsqueda
- 👥 Gestión de usuarios
- ⭐ Moderación de reseñas
- 📦 Historial de pedidos

---

## 🚀 Cómo usar

### Opción A – Abrir directamente en el navegador
```bash
# Clona o descarga el repositorio
git clone https://github.com/TU_USUARIO/marketec.git

# Abre index.html en cualquier navegador moderno
open marketec/index.html
```

> ⚠️ Si usas Chrome y hay problemas de CORS con las imágenes locales, usa la Opción B.

### Opción B – Servidor local (recomendado)
```bash
# Con Python
cd marketec
python3 -m http.server 8080

# O con Node.js
npx serve .

# Abre en el navegador:
# http://localhost:8080
```

### Opción C – GitHub Pages (gratis)
1. Sube la carpeta al repositorio
2. Ve a **Settings → Pages**
3. Selecciona la rama `main` y la carpeta raíz
4. ¡Listo! Accede desde `https://TU_USUARIO.github.io/marketec`

---

## 🔐 Credenciales demo

| Rol | Correo | Contraseña |
|-----|--------|-----------|
| Admin | `admin@marketec.mx` | `admin123` |
| Emprendedor demo | `ana@tec.mx` | `1234` |
| Otros demos | `carlos@tec.mx`, `maria@tec.mx`, `pedro@tec.mx`, `laura@tec.mx` | `1234` |

---

## 🗄️ Base de datos

Actualmente usa **localStorage** del navegador como almacenamiento. Los datos persisten entre sesiones en el mismo dispositivo y navegador.

Cuando estés listo para conectar un backend real (Firebase, Supabase, Node.js, etc.), solo reemplaza las funciones en `marketec.js` — el resto de la app no necesita cambios porque todas las llamadas pasan por la capa `MT.Negocios`, `MT.Auth`, `MT.Resenas`, etc.

```javascript
// Ejemplo: reemplazar con fetch a tu API
const Negocios = {
  todos: async () => {
    const res = await fetch('/api/negocios');
    return res.json();
  },
  // ...
};
```

---

## 📦 Tecnologías

- HTML5 + CSS3 + JavaScript puro (sin frameworks)
- Google Fonts (Nunito + Fredoka One)
- localStorage para persistencia de datos
- WhatsApp Web API para pedidos

---

## 📸 Capturas de pantalla

| Catálogo | Negocio | Panel Admin |
|----------|---------|-------------|
| index.html | negocio.html | admin.html |

---

## 🗺️ Roadmap futuro

- [ ] Backend real (Firebase / Supabase)
- [ ] Notificaciones push para nuevos pedidos
- [ ] Sistema de pagos en línea
- [ ] Mapa de ubicaciones
- [ ] Versión PWA (app instalable)
- [ ] Panel de estadísticas avanzadas

---

## 👨‍💻 Desarrollado para el Instituto Tecnológico de Tijuana

© 2025 MarkeTec · Proyecto estudiantil
