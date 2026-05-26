# SalaDeJuegos

Primer Parcial de la materia **Programacion IV** para la universidad **UTN FRA**

## Alumno:
Moreno Pablo

## Deployment:
[Sala de juegos](https://sala-de-juegos-bay.vercel.app)

## Tecnologias Usadas:
- Supabase
- Angular
- Vercel
- Visual Studio Code

# Sprint #1
El Sprint #1 contiene un prototipo inicial de las funcionalidades básicas de la aplicación, incluyendo:
- Login de usuarios
- Registro
- Pantalla Home

En esta versión, los usuarios pueden acceder al Home sin necesidad de estar autenticados. El Home cuenta con un botón que permite visualizar información del usuario obtenida desde la API de GitHub.

Además, este sprint presenta el diseño visual inicial de la aplicación y una navegación básica entre componentes

# Sprint #2
El Sprint #2 incorpora todas las funcionalidades desarrolladas en el Sprint #1.

En esta versión, los usuarios pueden iniciar sesión o registrarse para acceder a las funcionalidades principales de la aplicación. En caso de ingresar de forma anónima, la pantalla Home informa al usuario que debe iniciar sesión o registrarse.

La pantalla de Login también incorpora un botón desplegable con tres usuarios previamente registrados para facilitar las pruebas de acceso.

# Sprint #3
El Sprint #3 incorpora todas las funcionalidades desarrolladas en el Sprint #2.

En esta versión se incorporan dos nuevos juegos:
- **Ahorcado**: el clásico juego de adiviar la palabra sin formar la figura del ahorcado.
- **mayor o menor**: un juego donde tienes que adivinar si la carta oculta es mayor o menor a tu carta. 

Además, se agrego un chat global en tiempo real. para la interaccion entre usuarios. 

Tambien se ha renovado el estilo de la pagina de forma casi completa, principalmente en las paginas de:

- login
- registro
- home
- quiensoy

cambiando la accesibilidad del componete Quien soy hacia el footer de la pagina principal
 
En este sprint se a incorporado el fremework de Bootstrap con el fin de mejorar el apartado visual 

# Sprint #4
El Sprint #4 incorpora todas las funcionalidades desarrolladas en el Sprint #3.

En esta versión se agregan 2 nuevos juegos:

- **Preguntados**: un cuestionario de 5 preguntas de diferentes temáticas.
- **Simple BlackJack**: una simplificación del clásico juego de cartas BlackJack, donde el objetivo es vencer al dealer.

Además, ahora es posible visualizar las puntuaciones de todos los jugadores en cada juego.

# Sprint #4
El Sprint #4 incorpora todas las funcionalidades desarrolladas en el Sprint #4.

En esta versión se implementa 2 nuevos compoentens:

- **Encuesta**: es una encuesta de experiencia de usuario.
- **Resuktados**: es la lista de todas las encuestas completadas por cada usuario(solamente acceible por un usario con rol de admin).
