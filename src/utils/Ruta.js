export default class Ruta {
    static DOMINIO = 'https://core-yoparticipo.hstudio.icu';

    static rutaBuscarPersona(codigo) {
        return Ruta.DOMINIO+'/api/v1/claustro/buscar/'+codigo;
    }
}
