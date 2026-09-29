# Snail Race Betting App

Aplicación web simulada para registro de usuarios, autenticación, visualización de un dashboard y recargas de saldo mediante un servicio ficticio llamado **SnailPay**.

El proyecto fue desarrollado con React, TypeScript y Express.

---

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Ant Design
- React Router
- Axios
- ECharts
- CryptoJS

### Backend

- Node.js
- Express
- TypeScript
- Vitest
- Supertest
- CORS

---

## Estructura del proyecto

```text
marcos-4827/
├── backend/
├── frontend/
└── README.md
```

---

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm

---

# Instalación

## Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

---

## Frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

---

# Ejecución del proyecto

Es necesario ejecutar frontend y backend al mismo tiempo.

## Backend

Desde la carpeta:

```text
backend/
```

ejecutar:

```bash
npm run dev
```

El backend se ejecutará en:

```text
http://localhost:3000
```

---

## Frontend

Desde la carpeta:

```text
frontend/
```

ejecutar:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local donde puede abrirse la aplicación.

Normalmente será similar a:

```text
http://localhost:5173
```

---

# Funcionalidades principales

La aplicación permite:

- Registrar un usuario
- Iniciar sesión con correo y contraseña
- Mantener la sesión después de recargar la página
- Cerrar sesión
- Proteger el acceso al dashboard
- Visualizar el saldo actual
- Visualizar una gráfica de apuestas ganadas y perdidas
- Visualizar una gráfica con las victorias de seis caracoles
- Realizar recargas de saldo mediante SnailPay
- Persistir información mediante LocalStorage

---

# Registro e inicio de sesión

El registro solicita:

- Nombre completo
- Correo electrónico
- Contraseña
- Confirmación de contraseña

La contraseña no se almacena directamente.

Antes de guardarse en LocalStorage se genera un hash utilizando SHA-256.

El usuario inicia con un saldo de:

```text
$0.00
```

Después del registro se crea una sesión local que permite mantener el acceso al dashboard incluso después de recargar la página.

---

# SnailPay

SnailPay es un servicio de pagos completamente simulado implementado en el backend.

El endpoint utilizado para realizar una recarga es:

```text
POST /api/snailpay/recarga
```

URL completa en desarrollo:

```text
http://localhost:3000/api/snailpay/recarga
```

---

# Datos para una recarga exitosa

Para simular una transacción aprobada se deben utilizar los siguientes datos:

```text
Número de tarjeta: 1234123412341234
Fecha de vencimiento: 12/26
CVV: 543
Nombre completo: cualquier nombre no vacío
Monto: cualquier cantidad mayor a 0
```

Ejemplo:

```text
Número de tarjeta: 1234123412341234
Fecha: 12/26
CVV: 543
Nombre: Usuario Test
Monto: 500
```

El servicio responderá con:

```text
status: approved
status_detail: accredited
```

Cuando la recarga es aprobada:

- El monto se suma al saldo actual
- El nuevo saldo se guarda en LocalStorage
- El dashboard actualiza el saldo inmediatamente
- La respuesta de SnailPay se guarda en LocalStorage
- Se muestra un mensaje de confirmación

---

# Transacción rechazada

Para simular una transacción rechazada puede utilizarse cualquier tarjeta de 16 dígitos diferente a las tarjetas reservadas para otros escenarios.

Ejemplo:

```text
Número de tarjeta: 1111111111111111
Fecha: 12/26
CVV: 543
Nombre: Usuario Test
Monto: 500
```

La respuesta será:

```text
status: rejected
status_detail: invalid_payment_data
```

La aplicación mostrará:

```text
La transacción fue rechazada
```

El saldo no se modifica.

---

# Error interno de SnailPay

Para simular un error interno del servicio se utiliza la siguiente tarjeta ficticia:

```text
2222222222222222
```

Ejemplo:

```text
Número de tarjeta: 2222222222222222
Fecha: 12/26
CVV: 543
Nombre: Usuario Test
Monto: 500
```

El backend responderá con código HTTP:

```text
500
```

y con:

```text
status: error
status_detail: internal_server_error
```

La aplicación mostrará:

```text
Ocurrió un error interno en SnailPay
```

El saldo no se modifica.

---

# Simulación de timeout

Para simular que SnailPay tarda demasiado en responder se utiliza:

```text
3333333333333333
```

Ejemplo:

```text
Número de tarjeta: 3333333333333333
Fecha: 12/26
CVV: 543
Nombre: Usuario Test
Monto: 500
```

El backend espera aproximadamente:

```text
5 segundos
```

mientras que Axios tiene configurado un timeout de:

```text
3 segundos
```

Por lo tanto, el frontend cancela la espera y muestra:

```text
SnailPay tardó demasiado en responder
```

El saldo no se modifica.

---

# Validaciones del formulario de recarga

La aplicación valida:

### Número de tarjeta

Debe contener exactamente:

```text
16 dígitos
```

### Fecha de vencimiento

Debe utilizar el formato:

```text
MM/YY
```

Los meses válidos se encuentran entre:

```text
01 y 12
```

### CVV

Debe contener exactamente:

```text
3 dígitos
```

### Nombre completo

No puede estar vacío.

### Monto

Debe ser mayor a:

```text
0
```

---

# Persistencia con LocalStorage

La aplicación utiliza LocalStorage para almacenar información local.

Entre los datos guardados se encuentran:

```text
usuario_registrado
sesion_activa
ultima_transaccion_snailpay
```

`usuario_registrado` contiene la información del usuario y su saldo actual.

`sesion_activa` permite identificar si existe una sesión iniciada.

`ultima_transaccion_snailpay` almacena la última respuesta generada por el servicio simulado.

Por requisito de la prueba técnica, el número de tarjeta y el CVV ficticios también forman parte de la respuesta de SnailPay y se almacenan en LocalStorage.

En una aplicación real no se deberían almacenar datos sensibles de una tarjeta ni el CVV de esta forma.

---

# Pruebas automatizadas

Las pruebas automatizadas del backend fueron implementadas utilizando:

- Vitest
- Supertest

Para ejecutarlas:

```bash
cd backend
npm test
```

Actualmente se prueban los siguientes escenarios:

- Recarga aprobada
- Transacción rechazada
- Error interno de SnailPay
- Campos importantes de la respuesta exitosa

Las pruebas utilizan datos ficticios y no dependen del usuario registrado en el navegador.

---

# Compilación

## Backend

Para comprobar que el backend compile correctamente:

```bash
cd backend
npm run build
```

Los archivos compilados se generan en:

```text
backend/dist/
```

---

## Frontend

Para comprobar que el frontend compile correctamente:

```bash
cd frontend
npm run build
```

Los archivos de producción se generan en:

```text
frontend/dist/
```

---

# Dashboard

El dashboard muestra:

- Nombre del usuario
- Saldo disponible
- Botón para cargar saldo
- Gráfica de apuestas ganadas y perdidas
- Gráfica de victorias de seis caracoles
- Botón para cerrar sesión

Los datos correspondientes a apuestas y carreras son simulados.

No se implementó lógica real de apuestas ni carreras.

---

# Datos simulados de las gráficas

La gráfica de apuestas utiliza datos simulados de apuestas ganadas y perdidas.

La gráfica de victorias contiene seis caracoles:

```text
Rango
Maylo
Scott
Lento
Rogelio
Kicks
```

Los datos son simulados y representan un total de seis carreras.

---

# Consideraciones técnicas

La aplicación fue desarrollada buscando mantener una estructura sencilla y fácil de comprender.

Se separaron responsabilidades mediante:

```text
views
components
services
context
hooks
types
utils
routes
controllers
```

La autenticación se administra mediante React Context.

Axios se utiliza para la comunicación entre frontend y backend.

El backend expone un servicio HTTP con Express.

LocalStorage se utiliza como mecanismo de persistencia debido a los requisitos de la prueba.

---

# Seguridad

La contraseña no se almacena directamente.

Se genera un hash SHA-256 antes de guardarla en LocalStorage.

Este enfoque se utiliza únicamente para la simulación solicitada.

En una aplicación real:

- La autenticación debería procesarse en el backend
- Las contraseñas deberían almacenarse en una base de datos
- Se debería utilizar un algoritmo específico para contraseñas como bcrypt o Argon2 con salt
- No se debería almacenar CVV
- No se debería almacenar información sensible de tarjetas en LocalStorage

---

# Estado del proyecto

Las principales funcionalidades solicitadas se encuentran implementadas y funcionando.

Se verificó que:

```text
Backend → npm run build
Frontend → npm run build
Pruebas → npm test
```

finalicen correctamente.