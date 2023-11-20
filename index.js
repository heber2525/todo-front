require("dotenv").config();

const express = require("express");
const { leerTareas, crearTarea, editarTextoTarea, editarEstadoTarea, borrarTarea } = require("./db");
const { json } = require("body-parser");

const servidor = express();

servidor.use(json());

servidor.use("/pruebas_api", express.static("./pruebas_api"));

servidor.get("/tareas", async (peticion, respuesta, siguiente) => {
  let [error, tareas] = await leerTareas();
  if (error) {
    return siguiente(1);
  }

  respuesta.json(tareas);
});

servidor.post("/nueva", async (peticion, respuesta, siguiente) => {
  let { tarea } = peticion.body;
  if (!tarea) {
    return siguiente(1);
  }
  let [error, id] = await crearTarea(tarea);
  if (error) {
    return siguiente(2);
  }
  respuesta.json({ resultado: "ok", id });
});

servidor.delete("eliminar/:id[0-9]{1,9}", async (peticion, respuesta) => {
  let id = Number(peticion.params.id);
  let [error, count] = await borrarTarea(id);
  if (error) {
    return siguiente(2);
  }
  respuesta.json({ resultado: count > 0 ? "ok" : "ko" });
});

servidor.use((error, peticion, respuesta, siguiente) => {
  // cualquier excepcion que envie el sistema(throw ) sera capturado por este middleware
  switch (error) {
    case 1:
      respuesta.status(400);
      return respuesta.json({ error: "....error en la peticion, faltan parametros" });
    case 2:
      respuesta.status(500);
      return respuesta.json({ error: "error en el servidor" });
    default:
      respuesta.status(400);
      return respuesta.json({ error: "error en la peticion: objeto JSON mal formado" });
  }
});

servidor.use((peticion, respuesta) => {
  respuesta.status(404);
  respuesta.json({ error: "recurso no encontrado !!!!" });
});

servidor.listen(process.env.PORT);
