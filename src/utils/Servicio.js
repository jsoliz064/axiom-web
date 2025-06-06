export default class Servicio {

    static post(ruta, dato) {
        const configuracion = {
            method: "POST",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(dato)
        };
        return new Promise( (resolve, reject) => {
            fetch(ruta, configuracion)
                .then(async response => {
                    const respuesta = await response.json();
                    if (!response.ok || response.status === 202) {
                        const error = (respuesta && respuesta.mensaje) || response.statusText;
                        reject(error);
                    }
                    resolve(respuesta);
                }).catch( error => {
                    reject(error);
                });
        } );
    }

    static get(ruta) {
        return new Promise( (resolve, reject) => {
            fetch(ruta)
                .then(async response => {
                    const respuesta = await response.json();
                    if (!response.ok || response.status === 202) {
                        const error = (respuesta && respuesta.mensaje) || response.statusText;
                        reject(error);
                    }
                    resolve(respuesta);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }

    static put(ruta, dato) {
        const configuracion = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(dato)
        };
        return new Promise( (resolve, reject) => {
            fetch(ruta, configuracion)
                .then(async response => {
                    const respuesta = await response.json();
                    if (!response.ok || response.status === 202) {
                        const error = (respuesta && respuesta.mensaje) || response.statusText;
                        reject(error);
                    }
                    resolve(respuesta);
                }).catch( error => {
                reject(error);
            });
        } );
    }

    static delete(ruta, ...parametros) {
        ruta = Servicio.rutaRest(ruta, parametros);
        const configuracion = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        };
        return new Promise( (resolve, reject) => {
            fetch(ruta, configuracion)
                .then(async response => {
                    const respuesta = await response.json();
                    if (!response.ok || response.status === 202) {
                        const error = (respuesta && respuesta.mensaje) || response.statusText;
                        reject(error);
                    }
                    resolve(respuesta);
                }).catch( error => {
                reject(error);
            });
        } );
    }

    static rutaRest(ruta, parametros) {
        if(ruta[ruta.length] !== '/') {
            ruta = ruta + '/';
        }
        for(let i = 0; i < parametros.length; i++) {
            ruta = ruta + parametros[i] + '/';
        }
        return ruta;
    }
}