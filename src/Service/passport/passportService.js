import { Strategy as LocalStrategy } from "passport-local";
import Controller from "../../Controller/controller.js"
import Service from "../Service.js";
import * as Logger from "../../scripts/Logger.js";

const Login = new LocalStrategy(
    async (username, password, next) => {
    try {
        const user = await Service.getUserByEmail(username);
        Logger.logConsola.info('Verificando usuario y contraseña');
        if(!user){
            return next(null, false);
        };

        if(!Controller.isValidPassword(user, password)){
            return next(null, false);
        };

        return next(null, user);

        } catch (error) {
        Logger.logError.error(error)
        };
});

const Signin =  new LocalStrategy({
  passReqToCallback: true},
        async (req, username, password, next) => {
          try {
          Logger.logConsola.info('Registrando usuario');
          const user = await Service.getUserByEmail(req.body.email);
          
          if(user){
            return next(null, false);
          };

          const { email, apellido, edad , direccion, phone} = req.body;

        const newUser = {
          email:email,
          password: Controller.createHash(password),
          nombre: username,
          apellido,
          edad,
          direccion,
          numero: phone
        };

        await Service.saveUser(newUser);

        return next(null, newUser);

        } catch (error) {
            Logger.logError.error(error)
        }; 
});


const Serializar = (username, next) => {
    next(null, username.email);
};
  
const Deserializar = async (email, next) => {
    try {
      const acc = await Service.getUserByEmail(email);
      next(null, acc);
    } catch (error) {
      Logger.logError.error(error);
    };
};

export default{
    Login,
    Signin,
    Serializar,
    Deserializar
};