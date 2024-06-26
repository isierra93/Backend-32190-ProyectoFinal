import * as Logger from "../scripts/Logger.js";
import Service from "../Service/Service.js";
import * as Faker from "../scripts/Faker.js";
import * as Mailer from "../scripts/Nodemailer.js";
import bCrypt from "bcrypt";
//import notificacionWP from "../scripts/TwilioWpp.js";
import infoService from "../Service/info/infoService.js";

//SIGIN

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

function getSignin(req, res) {
  res.render("signin");
};

//LOGIN

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  };
  res.render("login");
};

//LOGOUT

function getLogout(req, res) {
  const username = req.user.nombre;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    } else {
      res.render("logout", { usuario: username });
    };
  });
};

//INDEX

function getIndex(req, res) {
  res.render("index", { user: req.user });
}

//PRODUCTS

async function getProductos(req, res) {
  try {
    let listExists = false;
    let productos = await Service.getAllProducts();

    if (productos.length <= 0) {
      return res.render("productos", { user: req.user, listExists });
    };

    listExists = true;

    res.render("productos", {
      user: req.user,
      productos: productos,
      listExists,
    });
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function postProductos(req, res) {
  try {
    if(Array.isArray(req.body)){
      await Service.saveManyProducts(req.body);

      return res.redirect("/productos");
    }
  
    await Service.saveProduct(req.body);

    return res.redirect("/productos");
  } catch (error) {
    Logger.logError.error(error);
  };
};

// CART

async function getCarrito(req, res) {
  try {
    const dueñoId = req.user.email;
    const { user } = req;
    let carritoExists = false;

    let carritoId = await Service.getCartByOwner(dueñoId);
    if (!carritoId) {
      return res.render("carrito", { user: user, carritoExists });
    };

    carritoExists = true;

    const carrito = await Service.getCartById(carritoId);
    const productosId = carrito.productos;

    const miCarrito = [];

    for (let i = 0; i < productosId.length; i++) {
      miCarrito.push(await Service.getProdById(productosId[i]));
    }

    res.render("carrito", {
      user: user,
      carritoId,
      miCarrito,
      productosId,
      carritoExists,
    });
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function getAddCarritoProd(req, res) {
  try {
    const { referer } = req.headers;
    const { email, prodId } = req.params;

    let carritoId = await Service.getCartByOwner(email);
    if (!carritoId) {
      carritoId = await Service.createCart(email);
    }

    await Service.addProdToCart(carritoId, prodId);

    return res.redirect(referer);
  } catch (error) {
    Logger.logError.error(error);
  };
};

async function getDeleteCarritoProd(req, res) {
  try {
    const { referer } = req.headers;
    const { email, prodId } = req.params;

    let carritoId = await Service.getCartByOwner(email);

    await Service.deleteProdFromCart(carritoId, prodId);

    return res.redirect(referer);
  } catch (error) {
    Logger.logError.error(error);
  }
}

async function getPedidoCarrito(req, res) {
  try {
    const { email, productosId } = req.params;
    const productos = productosId.split(",");
    const user = await Service.getUserByEmail(email);
    let carritoId = await Service.getCartByOwner(email);
    // Enviar email al admin pedido de compra
    Logger.logConsola.info("\n Comprador user: " + user + "\n Carrito ID: " + carritoId + "\n Productos: " + productos);

    const mailOptions = {
      from: "Coderhouse EcommerceApp",
      to: `${user.email}`,
      subject: `Nuevo pedido de compra de ${user.nombre}, Correo : ${user.email}`,
      html: `Productos ID: ${productos}`,
    };
    await Mailer.ecommerceGmail.sendMail(mailOptions);

    // Enviar wpp al admin pedido de compra
    //await notificacionWP(user);

    Logger.logConsola.info(
      "Administrador: " +
        `Nuevo pedido de compra de ${user.nombre} ${user.apellido}, correo : ${user.email}`
    );

    await Service.deleteCartById(carritoId);

    return res.redirect("/");
  } catch (error) {
    Logger.logError.error(error);
  };
};

//Perfil

function getPerfil(req, res) {
  res.render("perfil", { user: req.user });
}

//Fails

function getFailSignin(req, res) {
  res.render("errorSignin");
}

function getFailLogin(req, res) {
  res.render("errorLogin");
}

//Websocket
async function websocket (socket) {
  socket.on("addMocks", async (data) => {
    const prodMocks = Faker.getProdMocks();
    await Service.saveManyProducts(prodMocks);
});
  socket.on("deleteAllProductos", async (data) => {
    await Service.deleteAllProds();
  });
};

//Passport
function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password)
}

function createHash(password) {
  return bCrypt.hashSync(
    password,
    bCrypt.genSaltSync(10),
    null
  );
};

async function getAny(req, res) {
  res.redirect("/")
}

async function getInfo(req, res){
  const info = await infoService ();
  res.render("info", {...info});
};

export default{
  getSignin,
  getFailSignin,
  getLogin,
  getFailLogin,
  getLogout,
  getIndex,
  getProductos,
  postProductos,
  getAddCarritoProd,
  getDeleteCarritoProd,
  getPedidoCarrito,
  getCarrito,
  getPerfil,
  checkAuthentication,
  websocket,
  isValidPassword,
  createHash,
  getAny,
  getInfo
};
