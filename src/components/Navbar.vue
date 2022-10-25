<template>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color: #dedede;">
    <h1 class="h4 font-weight-normal mx-auto pt-2">Movimentação de estoque</h1>
    <ul class="navbar-nav ms-auto mx-2">
      <li class="nav-item">
        <a class="nav-link btn btn-sm btn-cancelar ms-2 px-1 font-weight-bold" @click="logout">Cancelar</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
f8f9fa
<style scoped>
  .btn-cancelar {
    --bs-btn-color: #000;
    --bs-btn-bg: #f8f9fab9;
    --bs-btn-border-color: #f8f9fab9;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #d3d4d5;
    --bs-btn-hover-border-color: #c6c7c8;
    --bs-btn-focus-shadow-rgb: 211,212,213;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #c6c7c8;
    --bs-btn-active-border-color: #babbbc;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #000;
    --bs-btn-disabled-bg: #f8f9fab9;
    --bs-btn-disabled-border-color: #f8f9fab9;
    font-weight: 700!important;
}
</style>
