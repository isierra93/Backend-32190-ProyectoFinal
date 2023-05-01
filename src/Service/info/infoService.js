import os from "os";
import { DOT_ENV } from "../../scripts/YArgs.js";

export default async function getInfo(){
    const argEntrada = process.argv.slice(2);
    const plataforma = process.platform;
    const version = process.version;
    const memoriaReservada = `${process.memoryUsage.rss()} bytes`;
    const cpus = os.cpus().length;
    const pathExec = process.cwd();
    const pid = process.pid;
    const carpProyectoArray = pathExec.replace(/\\/g, '/').split("/");
    const carpProyecto = carpProyectoArray[carpProyectoArray.length-1];
    const port = DOT_ENV.PORT;
    const mode = DOT_ENV.MODE;
  
    const info = {
      argEntrada,
      plataforma,
      version,
      memoriaReservada,
      cpus,
      pathExec,
      pid,
      carpProyectoArray,
      carpProyecto,
      port,
      mode
    };
  
    return info;
  };