# JS Pioners - Conectando Emprendedores e Inversores

![JS Pioners Logo](frontend/assets/img/JS_PIONERS_LOGO-removebg-preview.png)

## 🚀 Sobre el Proyecto

**JS Pioners** es un ecosistema digital diseñado para resolver una problemática fundamental en el mundo del emprendimiento: la brecha entre la innovación y la financiación.

### La Problemática

Muchos emprendedores con ideas innovadoras y proyectos con gran potencial de crecimiento no logran encontrar la financiación necesaria para llevarlos a cabo. Por otro lado, existen inversores (grandes y pequeños) buscando activamente oportunidades para apoyar nuevos negocios, pero carecen de un espacio centralizado y confiable para descubrirlos y evaluarlos.

### Nuestra Solución

**JS Pioners** construye un puente digital que conecta a estos dos mundos. Nuestra plataforma ofrece:

- **Para Emprendedores:** Un espacio para presentar sus proyectos de forma clara y atractiva, detallando su modelo de negocio, necesidades de financiación y potencial de mercado. La plataforma permite subir imágenes y descripciones para captar la atención de posibles inversores.
- **Para Inversores:** Una interfaz dinámica e intuitiva, **estilo Tinder**, que permite descubrir nuevos proyectos de manera ágil. Los inversores pueden deslizar para indicar interés ("like") o descartar un proyecto, creando una preselección de oportunidades de inversión.
- **Panel de Administración:** Un sistema de revisión donde los administradores pueden aprobar o rechazar los proyectos antes de que sean visibles para los inversores, garantizando un estándar de calidad y confianza.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules) y Bootstrap 5 para un diseño moderno y responsivo.
- **Backend:** Node.js con Express.js para la creación de la API REST.
- **Base de Datos:** MongoDB con Mongoose para modelar y persistir los datos.
- **Autenticación:** JWT (JSON Web Tokens) para proteger las rutas y gestionar las sesiones de los usuarios.
- **Subida de Archivos:** Multer para manejar la carga de imágenes de los proyectos.

## ⚙️ Pasos de Instalación

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
- Tener una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para obtener una URI de conexión.

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/tu-usuario/js-pioners.git](https://github.com/tu-usuario/js-pioners.git)
cd js-pioners
```

⚙️ Pasos de Instalación
Sigue estos pasos para levantar el proyecto en tu entorno local.

Prerrequisitos
Tener instalado Node.js (versión 18 o superior).

Tener una cuenta de MongoDB Atlas para obtener una URI de conexión.

1. Clonar el Repositorio
   Bash
```bash
git clone https://github.com/tu-usuario/js-pioners.git
cd js-pioners 
```
2. Instalar Dependencias
El proyecto utiliza varias dependencias de Node.js que están listadas en el archivo package.json. Para instalarlas, ejecuta el siguiente comando en la raíz del proyecto:

Bash
```bash
npm install
```

Esto instalará Express, Mongoose, bcrypt, JWT, Multer y todo lo necesario para que el servidor funcione correctamente.

3. Configurar las Variables de Entorno
   Para que el servidor se conecte a la base de datos y gestione la autenticación de forma segura, es necesario crear un archivo de variables de entorno.

Crea un archivo llamado .env en la raíz del proyecto (al mismo nivel que app.js) y añade las siguientes variables. Reemplaza los valores de ejemplo con tus propias credenciales.

Fragmento de código

# Puerto en el que correrá el servidor.

PORT=4000

# URI de conexión a tu base de datos de MongoDB Atlas.

# Asegúrate de reemplazar <user>, <password> y el nombre de tu base de datos.

MONGODB_URI=mongodb+srv://<user>:<password>@tu-cluster.mongodb.net/nombre-db

# Clave secreta para firmar los JSON Web Tokens (JWT).

# Debe ser una cadena de texto larga y segura.

JWT_SECRET=tu_clave_secreta_aqui
Nota: Puedes encontrar tu MONGODB_URI en el panel de control de MongoDB Atlas, en la sección de conexión de tu cluster. El JWT_SECRET es fundamental para la seguridad de la autenticación.

4. Ejecutar el Servidor
   Una vez instaladas las dependencias y configurado el archivo .env, puedes iniciar el servidor en modo de desarrollo. Este comando utiliza node --watch, que reiniciará el servidor automáticamente cada vez que hagas un cambio en el código del backend.

Bash
```bash
npm run dev
```

Si todo está correcto, verás un mensaje en tu terminal confirmando que el servidor está corriendo y que la conexión a la base de datos fue exitosa.

🚀 Servidor escuchando en http://localhost:4000 ✅ Conexión a la base de datos exitosa

5. Abrir el Frontend
   El frontend es estático (HTML, CSS, JS puros). Para visualizarlo, puedes usar una extensión como Live Server en Visual Studio Code. Haz clic derecho sobre el archivo frontend/index.html y selecciona "Open with Live Server".
