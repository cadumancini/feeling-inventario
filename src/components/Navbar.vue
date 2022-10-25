<template>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color: #dedede;">
    <h1 class="h5 mx-2 pt-2">Movimentação de estoque</h1>
    <ul class="navbar-nav ms-auto mx-2">
      <li class="nav-item">
        <a class="nav-link btn btn-sm btn-dismiss ms-2 px-2" @click="logout">Cancelar</a>
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
  .btn-dismiss {
    color: #fff;
    background-color: #aab4bd;
  }
  .btn-dismiss:hover {
    color: #fff;
    background-color: #93999e;
  }
</style>
