# Barbería M1 - Aplicación Web Oficial 💈✂️

Aplicación web moderna, elegante y responsive para **Barbería M1**, desarrollada con **React**, **Ionic React**, **TypeScript** y **Firebase Firestore**.

Diseñada con estética oscura premium (carbón y detalles en oro pulido), tipografía de alta distinción (*Playfair Display* e *Inter*) y experiencia optimizada para dispositivos móviles y computadoras.

---

## 📱 Pantallas Principales

La aplicación cuenta exclusivamente con las 3 vistas requeridas:

1. **Inicio (`/inicio`)**
   - Hero con fotografía de barbería, nombre de la marca, eslogan y llamada a la acción *"Agendar Cita"*.
   - Tarjeta informativa con ubicación física, horarios de apertura y teléfono con acceso directo de marcado.
   - Resumen de pilares y valor distintivo de la barbería.
   - Botón flotante interactivo de **WhatsApp** (`ion-fab`).

2. **Servicios y Productos (`/servicios`)**
   - Pestañas con selector animado (`ion-segment`) para alternar entre **Servicios** y **Productos**.
   - **Servicios:** Tarjetas con nombre, descripción, duración, precio en pesos y botón de reserva directa.
   - **Productos:** Vitrina visual con imagen de alta calidad, descripción y precio.
   - Sincronización en tiempo real con Firestore y botón para sembrar datos iniciales (`Seed`).

3. **Agendar Cita (`/agendar`)**
   - Formulario completo con validación en tiempo real:
     - Nombre y Apellido
     - Teléfono de contacto
     - Servicio deseado (extraído de Firestore)
     - Barbero profesional (Mateo, Carlos, Daniel)
     - Fecha con selector `ion-datetime` (bloquea fechas pasadas y domingos)
     - Horario de 10:00 a 19:00 cada 30 minutos con chips interactivos
   - Consulta de disponibilidad en tiempo real: los turnos ya ocupados por el barbero se muestran tachados y deshabilitados.
   - Verificación de doble reserva antes de guardar.
   - Alerta con comprobante de confirmación tras registrar el turno.

---

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior

---

## 🛠️ Instalación y Configuración

### 1. Clonar o acceder a la carpeta del proyecto
```bash
cd barb
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase (Opcional para producción)
Copia el archivo de ejemplo `.env.example` a un nuevo archivo `.env`:

```bash
cp .env.example .env
```

Abre `.env` y coloca las credenciales de tu proyecto de Firebase:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:...
```

> **Nota:** La aplicación incluye un modo fallback offline automático. Si aún no configuras tus claves de Firebase o no tienes conexión a internet, la app cargará y almacenará los datos localmente sin romperse.

### 4. Reglas de Firestore
Si utilizas Firebase, publica las reglas contenidas en `firestore.rules` desde la consola de Firebase:
- Lectura pública de `servicios` y `productos`.
- Creación segura de turnos en `citas` sin permisos de edición ni borrado para proteger la integridad.

---

## 💻 Ejecución del Proyecto

Puedes iniciar el servidor de desarrollo utilizando cualquiera de estos comandos:

```bash
# Opción 1: Con npm (recomendado)
npm run dev

# Opción 2: Con Ionic CLI (si lo tienes instalado globalmente)
ionic serve
```

Abre tu navegador en:
```
http://localhost:3000
```

---

## 📦 Estructura del Proyecto

```
barb/
├── firestore.rules          # Reglas de seguridad para Firestore
├── .env.example             # Plantilla de variables de entorno
├── .env                     # Variables de entorno locales
├── ionic.config.json        # Configuración para Ionic CLI
├── src/
│   ├── App.tsx              # Componente raíz con ion-tabs y enrutamiento
│   ├── main.tsx             # Punto de entrada de la aplicación
│   ├── theme/
│   │   └── variables.css    # Paleta oscura y dorada de Ionic
│   ├── data/
│   │   └── initialData.ts   # Catálogo inicial, barberos y datos de la barbería
│   ├── services/
│   │   ├── firebase.ts      # Inicialización modular de Firebase SDK v9+
│   │   └── citasService.ts  # Lógica de Firestore, citas y prevención de solapamiento
│   ├── components/
│   │   ├── WhatsAppFab.tsx      # Botón flotante de WhatsApp
│   │   ├── ServiceCard.tsx      # Tarjeta de servicio con botón de reserva
│   │   ├── ProductCard.tsx      # Tarjeta de producto de vitrina
│   │   └── TimeSlotSelector.tsx # Grilla de horarios con detección de ocupados
│   └── pages/
│       ├── Inicio.tsx               # Pantalla 1: Bienvenida e info
│       ├── ServiciosProductos.tsx   # Pantalla 2: Catálogo con segment
│       └── AgendarCita.tsx          # Pantalla 3: Formulario de reservas
```

---

## 💈 Barbería M1 - Elegancia clásica, precisión moderna.
