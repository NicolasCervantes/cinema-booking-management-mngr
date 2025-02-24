# Backend - Movie Reservation API

## Descripción

El backend proporciona una API RESTful que permite gestionar películas, teatros, showtimes, asientos y reservas. Los evaluadores pueden interactuar con la API utilizando herramientas como Postman o cURL para probar los diferentes endpoints.

## Funciones

Este backend permite:

- Registrar películas (título, género, duración, clasificación).
- Registrar salas (nombre, capacidad).
- Reservar asientos (película, sala, horario, asientos seleccionados).
- Listar todas las películas, salas y reservas.

## Estructura del proyecto

```plaintext
backend
├── src
│   ├── config
│   │   ├── awsConfig.ts        # Configuración de AWS SES
│   │   └── dbConfig.ts         # Configuración de la base de datos
│   ├── controllers
│   │   ├── movieController.ts  # Controlador para películas
│   │   ├── reservationController.ts # Controlador para reservas
│   │   ├── seatController.ts   # Controlador para asientos
│   │   ├── showtimeController.ts # Controlador para horarios de función
│   │   └── theaterController.ts # Controlador para teatros
│   ├── models
│   │   ├── associations.ts     # Definición de asociaciones entre modelos
│   │   ├── movieModel.ts       # Modelo de película
│   │   ├── reservationModel.ts # Modelo de reserva
│   │   ├── seatModel.ts        # Modelo de asiento
│   │   ├── showtimeModel.ts    # Modelo de horario de función
│   │   └── theaterModel.ts     # Modelo de teatro
│   ├── repositories
│   │   ├── movieRepository.ts  # Repositorio para películas
│   │   └── reservationRepository.ts # Repositorio para reservas
│   ├── services
│   │   ├── movieService.ts     # Servicio para películas
│   │   └── reservationService.ts # Servicio para reservas
│   ├── index.ts                # Punto de entrada de la aplicación
│   └── seedData.ts             # Script para poblar la base de datos con datos iniciales
├── test
│   ├── controllers
│   │   ├── movieController.spec.ts # Pruebas para el controlador de películas
│   │   ├── reservationController.spec.ts # Pruebas para el controlador de reservas
│   │   ├── seatController.spec.ts  # Pruebas para el controlador de asientos
│   │   ├── showtimeController.spec.ts # Pruebas para el controlador de horarios de función
│   │   └── theaterController.spec.ts # Pruebas para el controlador de teatros
│   ├── services
│   │   ├── movieService.spec.ts  # Pruebas para el servicio de películas
│   │   └── reservationService.spec.ts # Pruebas para el servicio de reservas
│   └── index.spec.ts             # Pruebas para el punto de entrada de la aplicación
├── .env                          # Archivo de configuración de variables de entorno
├── package.json                  # Archivo de configuración de npm
├── tsconfig.json                 # Archivo de configuración de TypeScript
└── README.md                     # Documentación del proyecto
```

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Base de datos PostgreSQL

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO_BACKEND>
   cd backend

2. Instala las dependencias:
    ```
   npm install
   ```

3. Configura las variables de entorno:
    En el archivo .env de la raíz del proyecto añade o modifica las siguientes variables:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    AWS_ACCESS_KEY_ID=tu_access_key_id
    AWS_SECRET_ACCESS_KEY=tu_secret_access_key
    AWS_REGION=tu_region

4. Ejecuta las migraciones y seeders para poblar la base de datos:
    npm run migrate
    npm run seed

5. Inicia el servidor
    npm start

6. Estos son los siguientes endpoints existentes en el proyecto:

    GET /api/movies: Obtiene todas las películas.
    POST /api/movies: Crea una nueva película.
    GET /api/theaters: Obtiene todos los teatros.
    POST /api/theaters: Crea un nuevo teatro.
    GET /api/showtimes: Obtiene todos los showtimes.
    POST /api/showtimes: Crea un nuevo horario de función (showtime).
    GET /api/seats: Obtiene todos los asientos.
    POST /api/seats: Crea un nuevo asiento.
    GET /api/reservations: Obtiene todas las reservas.
    POST /api/reservations: Crea una nueva reserva.
    GET /api/report/by-showtime/:showtimeId: Obtiene el reporte de reservas por horarios de función (showtimes).

7. Para ejecutar las pruebas unitarias, usar el comando:
    npm run test
