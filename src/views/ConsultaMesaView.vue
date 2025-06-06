<template>
  <div class="container">
    <div class="row d-flex justify-content-center">

      <div class="col-12 col-md-10 col-xl-8  mt-5">
      </div>

      <div class="col-12 col-md-10 col-xl-8 mt-1">
        <div class="card">
          <div class="card-header bg-white">
            <div class="d-flex flex-column">
              <span class="fs-4 fw-semibold text-success">Consulta el Padrón Electoral</span>
              <span class="text-secondary">Ingrese sus datos para verificar el estado de su registro</span>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="buscarRegistro">
              <div class="row">
                <div class="col-12 col-md-8">
                  <div class="mb-3">
                    <label for="inputCodigo" class="form-label">Registro/Código:</label>
                    <input type="number" class="form-control" id="inputCodigo" onfocus="this.select()" placeholder="22500000" v-model="codigo"
                      :disabled="isLoading" required>
                  </div>
                </div>
                <div class="col-12 col-md-4 d-flex align-items-center">
                  <button type="submit" class="btn btn-success w-100 mt-md-3 mt-0" :disabled="isLoading">
                    <span v-if="!isLoading">Buscar</span>
                    <div v-else class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>

            <div v-if="isLoading" class="mt-4">
              <div class="d-flex align-items-center justify-content-center">
                <div class="spinner-border text-success me-2" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <span class="text-success">Consultando registro...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isHaveDato" class="col-12 col-md-10 col-xl-8 my-5">
        <div class="card">
          <div class="card-body">
            <p class="fs-6"> <span class="fw-semibold">Nombre:</span> <span>{{ personaDato.nombre }}</span> </p>
            <p class="fs-6"> <span class="fw-semibold">Registro/Código:</span> <span>{{ personaDato.codigo }}</span>
            </p>
            <p class="fs-6"> <span class="fw-semibold">Jurado:</span> <span>{{ personaDato.jurado }}</span> </p>

            <p v-if="personaDato.mesa > 0" class="fs-6"> <span class="fw-semibold">Mesa Jurado:</span> <span>{{
                personaDato.mesa }}</span> </p>

            <div v-for="(lugar, index) in this.personaDato.lugares" :key="index"
              class="d-flex flex-column border-top border-success border-3 border-opacity-50 py-3">
              <div class="fs-6"> <span class="fw-semibold">Facultad:</span> <span>{{ lugar.facultad }}</span> </div>
              <div class="fs-6"> <span class="fw-semibold">Carrera:</span> <span>{{ lugar.carrera }}</span> </div>
              <div class="fs-6"> <span class="fw-semibold">lugar de votación:</span> <span>{{ lugar.lugar }}</span>
              </div>
              <div class="fs-6"> <span class="fw-semibold">Mesa:</span> <span>{{ lugar.mesa }}</span> </div>
              <div class="fs-6"> <span class="fw-semibold">Lugar de mesa:</span>
                <span>{{ ' Modulo: ' + lugar.mesaData.modulo + ' | Aula: ' + lugar.mesaData.aula + ' | Piso: ' +
                  lugar.mesaData.piso }}</span>
              </div>
              <div class="fs-6"> <span class="fw-semibold">Jurado:</span> <span>{{ lugar.jurado }}</span> </div>
              <div class="fs-6"> <span class="fw-semibold">Vota Dirección:</span> <span>{{ lugar.direccion }}</span>
              </div>
              <div class="fs-6"> <span class="fw-semibold">Vota Decanato:</span> <span>{{ lugar.decanato }}</span>
              </div>
              <div class="fs-6"> <span class="fw-semibold">Vota Rectorado:</span> <span>{{ lugar.rectorado }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div v-if="notHaveDato" class="col-12 col-md-10 col-xl-8 my-5">
        <div class="card border-danger">
          <div class="card-body text-danger">
            <h5 class="card-title">Ups, algo ha ocurrido</h5>
            <p class="card-text">{{ error }}</p>

            <div class="d-flex flex-column pt-2 pb-0 w-100">
              <span class="fs-6 fw-bolder">Opción N°1:</span>
              <span class="fs-6">No esta habilitado para votar debido a no contar con materia inscripta el semestre
                1-2025.</span>
              <span class="fs-6 fw-bolder">Opción N°2:</span>
              <span class="fs-6">No esta habilitado para votar y tienes materia inscrita, es debido a que el corte de
                estudiantes habilitado fue antes de tu inscripción.</span>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Propuesta -->
    <div class="modal fade" id="propuestaModal" tabindex="-1" aria-labelledby="propuestaModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img :src="imagenPropuesta" class="img-fluid" alt="Propuesta Electoral" v-if="imagenPropuesta">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Servicio from "@/utils/Servicio";
import Ruta from "@/utils/Ruta";
import PropuestaRandom from "@/utils/PropuestaRandom";

export default {
  name: 'ConsultaMesaView',

  data() {
    return {
      codigo: '',
      isLoading: false,
      isHaveDato: false,
      notHaveDato: false,
      personaDato: {},
      imagenPropuesta: '',
      error: '',
      propuestaRandom: null,
      modal: null,
    }
  },

  methods: {
    buscarRegistro() {
      this.isLoading = true;
      this.isHaveDato = false;
      this.notHaveDato = false;

      Servicio.get(Ruta.rutaBuscarPersona(this.codigo)).then(respuesta => {
        if (respuesta.codigo === 0) {
          throw new Error(respuesta.error);
        }
        this.personaDato = respuesta.data.persona;
        this.mostrarPropuesta();
        this.isLoading = false;
        this.isHaveDato = true;
      }).catch((error) => {
        this.error = error;
        this.isLoading = false;
        this.isHaveDato = false;
        this.notHaveDato = true;
      });
    },

    mostrarPropuesta() {
      this.imagenPropuesta = "../assets/imagenes/propuestas/" + this.propuestaRandom.getImagen();
      this.modal.show();
    }

  },

  mounted() {
    this.modal = new Modal(document.getElementById('propuestaModal'));
    this.propuestaRandom = new PropuestaRandom();
  }
}
</script>

<style scoped>
.spinner-border {
  width: 1rem;
  height: 1rem;
}

.modal-body img {
  max-height: 70vh;
  object-fit: contain;
}
</style>