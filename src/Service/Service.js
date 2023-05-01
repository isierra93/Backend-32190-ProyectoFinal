import ProductosDAOdb from "../Persistencia/contenedores/mongohijos/ProductosDAOdb.js";
import MensajesDAODb from "../Persistencia/contenedores/mongohijos/MensajesDAOdb.js";
import UsuariosDAO from "../Persistencia/contenedores/mongohijos/UsuariosDAO.js";
import CarritosDAO from "../Persistencia/contenedores/mongohijos/CarritosDAO.js";

const Users = UsuariosDAO.getInstance();
const Messages = MensajesDAODb.getInstance();
const Products = ProductosDAOdb.getInstance();
const Carros = CarritosDAO.getInstance();


async function getAllProducts(){
    return await Products.getAll();
};

async function getProdById(id){
    return await Products.getById(id);
}

async function getProdByTags(tags){
    return await Products.getByTags(tags);
};

async function saveManyProducts(prods){
    return await Products.saveMany(prods);
};

async function deleteAllProds(){
    await Products.deleteAll();
    return;
};

async function createCart(owner){
    return await Carros.crearCarrito(owner);
};

async function addProdToCart(cartId, prodId){
    return await Carros.añadirProducto(cartId,prodId);
};

async function getCartByOwner(owner){
    return await Carros.getCarritoIdByDueño(owner);
};

async function getCartById(id){
    return await Carros.getById(id);
};

async function deleteProdFromCart(cartId, prodId){
    return await Carros.eliminarProducto(cartId, prodId);
};

async function deleteCartById(id){
    return await Carros.deleteById(id);
};

async function getUserByEmail(email){
    return await Users.getByEmail(email);
};

async function saveUser(user){
    return await Users.save(user);
};

export default {
    getAllProducts,
    getProdById,
    getProdByTags,
    saveManyProducts,
    deleteAllProds,
    createCart,
    addProdToCart,
    getCartByOwner,
    getCartById,
    deleteProdFromCart,
    deleteCartById,
    getUserByEmail,
    saveUser,
};