import Twilio from "twilio";

const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;
const TWILIOFROM = process.env.TWILIOFROM;
const TWILIOTO = process.env.TWILIOTO;

const twilioAuth = {
  ACCOUNTSID,
  AUTHTOKEN,
};

const client = Twilio(twilioAuth.ACCOUNTSID, twilioAuth.AUTHTOKEN);

async function notificacionWP(user){
  try {
    client.messages.create({
      body: `Administrador!:
      Nuevo pedido de compra de ${user.nombre} ${user.apellido}, Correo : ${user.email}`,
      from: TWILIOFROM,
      to: TWILIOTO
    })
  } catch (error) {
    Logger.logError.error(error);
  };
};

export default notificacionWP;