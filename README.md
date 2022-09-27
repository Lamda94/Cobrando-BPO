# Prueba Técnica Cobrando BPO 

Este aplicativo fue desarrollado utilizando el lenguaje de programación JavaScript.

## Instrucciones de ejecución

1.	Ubicado en la carpeta raíz del proyecto ejecutar el comando

### `npm install`

2. Configurar las credenciales del motor de base de datos en el proyecto

3. Verificar que existan una base de datos llamada CBPOS en el motor postgres

4. Ejecutar el comando 

### `npx sequelize-cli db:migrate`

Con esto tendremos la conexión a nuestra base de datos lista y las tablas requerida fueron creadas.

5. Ejecutar el comando 

### `npm run start-emple`

Con esto ya tenemos el microservicio para la entidad empleados funcionando.

El punto de entrada para este servicio es http://localhost:1234/emple 

6. Ejecutar el comando 

### `npm run start-depa`

Con esto ya está funcionando el microservicio para los departamentos

El punto de entrada para este servicio es http://localhost:3000/depa 