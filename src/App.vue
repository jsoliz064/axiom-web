<template>
  <div class="page-container">
    <nav class="navbar navbar-expand-lg bg-success">
      <div class="container-fluid d-flex justify-content-center">
        <div class="d-flex">
          <img src="/assets/imagenes/axiom.png" alt="axiom" width="48" height="48" class="d-inline-block align-text-top">
          <a class="navbar-brand align-self-center text-white fs-4 ms-3" href="/">
            Axiom Tú Mejor Opción
          </a>
        </div>
      </div>
    </nav>
    
    <main class="content">
      <router-view/>
    </main>

    <footer>
      <p class="fs-5">&copy; 2025 Axiom - FICCT</p>
    </footer>
  </div>
</template>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1 0 auto;
  }

  footer {
    flex-shrink: 0;
    width: 100%;
    background: url('./assets/imagenes/portada-facebook.png') center bottom no-repeat;
    background-size: cover;
    color: white;
    text-align: center;
    padding: 8rem 1rem 2rem;
    position: relative;
  }

  footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 63, 26, 0.7);
    z-index: 0;
  }

  footer * {
    position: relative;
    z-index: 1;
  }

  footer p {
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    footer {
      background-size: cover;
      padding: 4rem 1rem 2rem;
    }
  }
</style>

<script>
  import 'bootstrap';

  export default {
  }
</script>