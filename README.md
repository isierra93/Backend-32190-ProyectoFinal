# Proyecto backend - Coderhouse

### [Proyecto desplegado](https://backend-32190-proyectofinal-production.up.railway.app/)

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