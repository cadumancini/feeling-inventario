<template>
  <div class="contagem">
    <Navbar/>
    <div class="mx-3 mt-1">
      <div class="row mb-1">
        <div class="border border-2 rounded-3 px-2 py-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Código Produto</span>
                <input class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Lote</span>
                <input class="form-control" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-1">
        <div class="border border-2 rounded-3 px-2 py-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Cód. Operador</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Descrição</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Derivação</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Unidade</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Depósito Atual</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Depósito Destino</span>
                <select class="form-select" id="inputGroupSelect01">
                  <option selected>Selecione...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="input-group input-group">
                <span class="input-group-text">Quantidade</span>
                <input class="form-control" type="number">
                <span class="input-group-text">Kg</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-grid gap-2">
              <button class="btn btn-secondary" type="button">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Contagem',
  components: { Navbar },
  data () {
    return {
      
    }
  },
  mounted () {
    // if (!sessionStorage.getItem('token')) {
    //   this.$router.push({ name: 'Login' })
    // }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }
  .contagem {
    height: 100%;
  }
  .mouseHover {
    cursor: pointer;
  }
  .input-group-btn {
    width: 40px !important;
  }
  .btn-dismiss {
    color: #fff;
    background-color: #aab4bd;
  }
  .btn-dismiss:hover {
    color: #fff;
    background-color: #93999e;
  }
  .btn-action {
    width: 2rem;
    margin-left: 1px;
    margin-right: 1px;
  }
  .btn-busca {
    width: 1.75rem !important;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  .sm-header {
    font-size: 0.9rem !important;
  }
  .modal:nth-of-type(even) {
    z-index: 1062 !important;
  }
  .modal-backdrop.show:nth-of-type(even) {
    z-index: 1061 !important;
  }
  .white-bg {
    background-color: white !important;
  }
  .param-comercial {
    width: 7rem;
  }
  .param-guelta {
    padding-left: 2.2rem !important;
  }
  .param-rt {
    padding-left: 3.3rem !important;
  }
  .vlr-final {
    position: absolute;
    padding-top: 6px;
  }
</style>
