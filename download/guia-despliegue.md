# 🎮 Guía de Despliegue - Prestigio Roleplay

## Resumen Rápido
Tu web está lista. Estos son los pasos para subirla a GitHub y desplegarla GRATIS en Vercel.

---

## PASO 1: Instalar Git (si no lo tienes)

### En Windows:
1. Ve a https://git-scm.com/download/win
2. Descarga e instala Git
3. Durante la instalación, deja todas las opciones por defecto
4. Abre "Git Bash" (se instala con Git)

### En Mac:
Abre la Terminal y ejecuta:
```bash
xcode-select --install
```

### Verificar instalación:
```bash
git --version
```

---

## PASO 2: Crear cuenta en GitHub

1. Ve a https://github.com
2. Haz clic en "Sign up"
3. Crea tu cuenta con tu email
4. Verifica tu email
5. Elige el plan FREE (gratuito)

---

## PASO 3: Crear un nuevo repositorio en GitHub

1. En GitHub, haz clic en el botón **"+"** (esquina superior derecha)
2. Selecciona **"New repository"**
3. Rellena:
   - **Repository name**: `prestigio-roleplay-web`
   - **Description**: `Web de normativas del servidor Prestigio Roleplay`
   - **Public** ✅ (necesario para Vercel gratuito)
   - **NO** marques "Add a README" (ya lo tenemos)
   - **NO** marques .gitignore (ya lo tenemos)
4. Haz clic en **"Create repository"**
5. Copia la URL del repo (algo como `https://github.com/TUUSUARIO/prestigio-roleplay-web.git`)

---

## PASO 4: Subir el proyecto a GitHub

Abre una terminal (Git Bash en Windows) y ejecuta estos comandos:

```bash
# 1. Navega a la carpeta del proyecto
cd /home/z/my-project

# 2. Inicializa Git (solo la primera vez)
git init

# 3. Configura tu identidad (solo la primera vez en tu PC)
git config user.name "TuNombre"
git config user.email "tu@email.com"

# 4. Añade todos los archivos
git add .

# 5. Haz el primer commit
git commit -m "Web Prestigio Roleplay - versión inicial"

# 6. Conecta con tu repositorio de GitHub
git remote add origin https://github.com/TUUSUARIO/prestigio-roleplay-web.git

# 7. Sube el código
git push -u origin main
```

**Si te pide login:** GitHub ya no acepta contraseñas. Necesitas un Personal Access Token:
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)"
3. Marca el permiso "repo"
4. Genera el token y cópialo
5. Úsalo como contraseña cuando Git te la pida

---

## PASO 5: Desplegar en Vercel (GRATIS)

1. Ve a https://vercel.com
2. Haz clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel a acceder a tus repositorios
5. Una vez dentro, haz clic en **"Add New..."** → **"Project"**
6. Verás tu repositorio `prestigio-roleplay-web`
7. Haz clic en **"Import"**
8. En la configuración:
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Build Command**: `npx next build` (por defecto)
   - **Output Directory**: `.next` (por defecto)
   - No cambies nada más
9. Haz clic en **"Deploy"**
10. ¡Espera 1-2 minutos y listo! 🎉

Vercel te dará una URL como: `prestigio-roleplay-web.vercel.app`

---

## PASO 6: Dominio personalizado (OPCIONAL)

Si tienes un dominio propio (ej: prestigiorp.com):

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Añade tu dominio (ej: `normativas.prestigiorp.com`)
3. Vercel te dará registros DNS que debes configurar en tu proveedor de dominio
4. Una vez configurado, Vercel activa SSL automáticamente (candado verde 🔒)

---

## CÓMO ACTUALIZAR LA WEB en el futuro

Cada vez que quieras hacer cambios:

```bash
cd /home/z/my-project

# Añade los archivos modificados
git add .

# Haz un commit con descripción del cambio
git commit -m "Descripción del cambio"

# Sube a GitHub
git push
```

¡Vercel detecta el cambio automáticamente y redpliega en 1-2 minutos!

---

## ESTRUCTURA DEL PROYECTO

```
prestigio-roleplay-web/
├── public/
│   ├── logo.png                    # Logo del servidor
│   └── images/
│       ├── hero-bg.jpg             # Imagen del hero
│       └── normativas/             # Imágenes de fondo de cada normativa
│           ├── general.jpg
│           ├── ilicitos.jpg
│           ├── comercios.jpg
│           ├── staff.jpg
│           ├── streamers.jpg
│           ├── lspd.jpg
│           ├── manual-lspd.jpg
│           └── codigo-penal.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Página principal (home + normativa)
│   │   └── globals.css             # Estilos GTA RP
│   ├── components/
│   │   ├── Navbar.tsx              # Barra de navegación
│   │   ├── Footer.tsx              # Pie de página
│   │   ├── NormativaCard.tsx       # Tarjetas de normativas
│   │   ├── NormativaPage.tsx       # Página de lectura (book-mode)
│   │   └── NormativaBlock.tsx      # Bloques de contenido
│   └── lib/
│       └── normativas.ts           # Datos de todas las normativas
├── next.config.ts                  # Configuración de Next.js
├── vercel.json                     # Configuración de Vercel
├── package.json                    # Dependencias
└── .gitignore                      # Archivos ignorados por Git
```

---

## COSTES

| Servicio | Precio | Notas |
|----------|--------|-------|
| GitHub | GRATIS | Repositorios públicos ilimitados |
| Vercel | GRATIS | 100GB bandwidth/mes, SSL incluido |
| Dominio propio | ~10€/año | Opcional, puedes usar el .vercel.app gratis |

**Total: 0€** (sin dominio propio) o ~10€/año (con dominio propio)

---

## PROBLEMAS COMUNES

### "Git push me pide contraseña"
Usa un Personal Access Token (PASO 4) o configura SSH keys.

### "Vercel falla el build"
Verifica que el build funciona localmente: `npx next build`

### "Las imágenes no cargan"
Asegúrate de que las imágenes están en `public/images/` y que hiciste `git add .` antes del commit.

### "Quiero cambiar las normativas"
Edita el archivo `src/lib/normativas.ts`, haz commit y push. Vercel redpliega solo.
