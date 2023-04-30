import MensajesDAODb from "../contenedores/mongohijos/MensajesDAOdb.js";
import {DOT_ENV} from "../../scripts/YArgs.js";

let DAO;
const inputDAO = DOT_ENV.DAO;

switch (inputDAO){
  case "Mongo":
    DAO = MensajesDAODb.getInstance();
    break;
    default:
        throw new Error('Falta aclarar el tipo de DAO');
};

export default class MensajesDAOFactory {
  static getDAO(){
    return DAO;
  };
};