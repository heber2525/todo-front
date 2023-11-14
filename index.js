require("dotenv").config();

const express = require("express");
const { leerTareas, crearTarea, editarTextoTarea, editarEstadoTarea, borrarTarea } = require("./db");

const servidor = express();

servidor.use("/pruebas_api", express.static("./pruebas_api"));

servidor.get("/tareas", (peticion, respuesta) => {
  leerTareas().then(([error, tareas]) => {
    throw "hola";
  });

  // let [error, tareas] = await leerTareas();
  // if (!error) {
  //   return respuesta.json(tareas);
  // }
  // throw error;
});

servidor.use((error, peticion, respuesta, siguiente) => {
  // cualquier excepcion que envie el sistema(throw ) sera capturado por este middleware
  respuesta.send("...ocurrio un error");
});

servidor.use((peticion, respuesta) => {
  respuesta.status(404);
  respuesta.json({ error: "recurso no encontrado" });
});

servidor.listen(process.env.PORT);
