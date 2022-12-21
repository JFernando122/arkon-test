# ARKON test

## Configuración
  - Crear un archivo `.env` en la raiz del proyecto
  - copiar los contenidos del archivo `.env.example` al archivo `.env`
  - llenar las variables de entorno presentes en el archivo
      - `BD_USER` es el nombre de usuario de la base de datos 
      - `DB_PASS` es la contraseña del usuario de la base de datos
      - `DB_NAME` es el nombre de la base de datos
      - `DB_HOST` es la dirección de la base de datos
      - `PORT` es el puerto en el que la api va a estar a la escuchar de peticiones

  - Para la creacion de base de datos correr el comando `npm run db:migrate`
  - En caso de querer datos de prueba correr el comando `npm run db:seed` para llenar la base de datos con valores de prueba

Una vez que este llenado el archivo .env y la base de datos creada correr el comando `npm start`. Una vez ejecutado la API estará a la escucha de peticiones en localhost:PORT

NOTA: en caso de no especificar el puerto en el archivo `.env` se toma por defecto el puerto 8080

## Tests

Para correr los test solo es necesario correr el comando `npm test`. En general el comando va a limpiar la base de datos y va a llenarla con los datos de la seed, y después procederá a correr todas las pruebas

Las pruebas se encuentran en la carpeta test que está en la raíz del proyecto

## Estructura de la base de datos

#### Events
La tabla con la información de los eventos, como se pidió, contiene el nombre, la fecha de inicio y fin y la cantidad de boletos disponibles del evento.

```sql
CREATE TABLE `Events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `Items_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
```


#### Tickets
En esta tabla se lleva el registro de los tickets, contiene el id al evento al que está relacionado al igual que un campo booleano de si ya fue canjeado (`true`) o no (`false`).
```sql
CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `redeemed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
#### SequelizeMeta (extra)
Esta tabla es generada automáticamente por Sequelize para el manejo de migraciones
```sql
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci
```

## Extra
Como extra esta un archivo JSON con una pequeña colección de POSTMAN para las llamadas a la API. Solo contiene una llamada por endpoint, pero igual puede probarse llamando a los que estan mas de una vez. Por ejemplo llamando a la de canjear un ticket 2 vecez o tratando de llamar al de eliminar el evento después de comprar el ticket o después de cambiar la fecha final a una pasada.

Aparte de los endpoints requeridos, tambien estan /api/v1/event y /api/v1/ticket para ver todos los eventos y tickets respectivamente