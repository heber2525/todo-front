function ajax(url, metodo, datos) {
  let configuracion = !metodo ? null : { method: metodo };
  if (datos) {
    configuracion.body = JSON.stringify(datos);
    configuracion.headers = { "Content-type": "application/json" };
  }
  return fetch(url, configuracion).then((respuesta) => respuesta.json());
}
