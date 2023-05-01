# Proyecto backend - Coderhouse

Proyecto final para la comisión 32190 - Dictada por @marcosvillanueva9.
API REST desarrollada en JS para soportar las operaciones básicas de un ecommerce.

## Tecnologias utilizadas

MongoDB para la persistencia de la base de datos.
Twilio y Nodemailer para las notificaciones.
YArgs para los argumentos.
Logger para debug.
Faker para los mocks.
Passport como middleware de autenticación.


### [Proyecto desplegado en Railways🚆](https://backend-32190-proyectofinal-production.up.railway.app/)

# ENDPOINTS

## Router "/"
## Registro
| Method  | Ruta        | Descripción          |
| :---    | :---        | :---                 |
| POST    | /signin     | Crear cuenta.        |
| GET     | /failSingin | Al fallar el signin. |  

## Inicio de sesion
| Method  | Ruta       | Descripción         |
| :---    | :---       | :---                |
| POST    | /login     | Loguear cuenta.     |
| GET     | /failLogin | Al fallar el login. | 

## Index
| Method | Ruta | Descripción      |
| :---   | :--- | :---             |
| GET    | /    | Acceder a index. | 

## Productos
| Method | Ruta               | Descripción                         |
| :---   | :---               | :---                                |
| GET    | /productos         | Devuelve todos los productos.       |
| GET    | /productos/:filtro | Devuelve productos segun el filtro. |

## Carrito
| Method  | Ruta                 | Descripción                      |
| :---    | :---                 | :---                             |
| GET     | /carrito             | Devuelve el carrito.             |
| PUT/GET | /carrito/addProd/:id | Añade un producto al carrito.    |
| PUT/GET | /carrito/delProd/:id | Elimina un producto del carrito. |
| GET     | /carrito/comprar     | Realizar pedido de compra.       |

## Perfil
| Method | Ruta    | Descripción |
| :---   | :---    | :---        |
| GET    | /perfil | Informacion del usuario. |

## Info
| Method | Ruta  | Descripción             |
| :---   | :---  | :---                    |
| GET    | /info | Informacion del server. |

## Cierre de sesión
| Method | Ruta    | Descripción                |
| :---   | :---    | :---                       |
| GET    | /logout | Desloguear session activa. |