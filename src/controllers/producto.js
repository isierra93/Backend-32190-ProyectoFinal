const Producto = require('../containers/Producto');

const contenedorProducto = new Producto('productos.txt');
contenedorProducto.checkIfFileExists();


const getProductos = (req, res) => {
    const id = req.params.id; 

    if(id === undefined) {
        const productos = contenedorProducto.getProductos();
        res.json(productos);
    } else {
        const producto = contenedorProducto.getProductoById(id);
        res.json(producto);
    }
};

const postProducto = (request, res) => {
    const newProducto = {
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
    }

    res.json(contenedorProducto.postProducto(newProducto));
};

const putProducto = (request, res) => {

    const updateProducto = {
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
    }

    res.json(contenedorProducto.putProducto(request.params.id, updateProducto));
};

const deleteProducto = (request, res) => {
    
    res.json(contenedorProducto.deleteProducto(request.params.id));
}

module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto,
};