import ProductosDAOdb from "../contenedores/mongohijos/ProductosDAOdb";
import {DOT_ENV} from "../../scripts/YArgs.js";

let DAO;
const inputDAO = DOT_ENV.DAO;

switch(inputDAO){
    case "Mongo":
        DAO = ProductosDAOdb.getInstance();
        break;
    default:
        throw new Error('Falta aclarar el tipo de DAO');
};

export default class ProductosDAOFactory {
    static getDAO(){
        return DAO;
    };
};