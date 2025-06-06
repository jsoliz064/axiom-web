class PropuestaRandom {
    
    listaImagenes = [];
    
    constructor(){
        for (let i = 1; i <= 4; i++) {
            this.listaImagenes.push(`propuesta-${i}.png`);
        }
    }

    getImagen(){
        return this.listaImagenes[Math.floor(Math.random() * this.listaImagenes.length)];
    }

}

export default PropuestaRandom;