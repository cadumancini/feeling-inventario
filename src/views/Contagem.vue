<template>
  <div class="contagem">
    <Navbar/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cód. de Barras</span>
                <input class="form-control" type="text" v-on:keyup.enter="onEnter" v-model="codBarrasCab" ref="inputCodBarras">
                <!-- <button class="btn btn-secondary input-group-btn" @click="toggleScanner" data-bs-toggle="modal" data-bs-target="#barcodeModal">
                  <font-awesome-icon icon="barcode"/>
                </button> -->
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-8">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Produto</span>
                <input class="form-control" type="text" v-model="produtoCab">
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Der.</span>
                <input class="form-control" type="text" v-model="derivacaoCab">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Lote</span>
                <input class="form-control" type="text" v-model="loteCab">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-grid gap-2">
              <button id="btnBuscar" class="btn btn-secondary" type="button" @click="buscarProduto">Buscar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal BarcodeScanner -->
      <div class="modal fade" id="barcodeModal" tabindex="-1" aria-labelledby="barcodeModallLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="barcodeModalLabel">Escaneie o produto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBarcode" @click="toggleScanner"></button>
            </div>
            <div class="modal-body">
              <StreamBarcodeReader v-if="isScanning" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" @click="toggleScanner">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <div class="border border-2 rounded-3 px-2 py-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cód. Operador</span>
                <input class="form-control" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Produto</span>
                <input class="form-control" v-model="produto" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Descrição</span>
                <input class="form-control" v-model="descricao" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Derivação</span>
                <input class="form-control" v-model="derivacao" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Unidade</span>
                <input class="form-control" v-model="unidade" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Depósito Atual</span>
                <input class="form-control" v-model="depositoAtu" disabled type="text">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Depósito Destino</span>
                <select id="depositosList" class="form-select" :disabled="produtoInv === null">
                  <option selected disabled value="0">Selecione...</option>
                  <option v-for="deposito in depositos" :key="deposito.CODDEP" :selected="depositoAtu !== '' && deposito.CODDEP === depositoAtu" :value="deposito.CODDEP">{{deposito.CODDEP}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Quantidade</span>
                <input class="form-control" type="number" :disabled="produtoInv === null">
                <span class="input-group-text">{{this.unidade || '-'}}</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-grid gap-2">
              <button class="btn btn-secondary" type="button" :disabled="produtoInv === null">Salvar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5 mb-1">
        <div class="border border-2 rounded-3 px-2 py-2">
          <div class="row">
            <div class="d-grid gap-2">
              <button class="btn btn-secondary" type="button" @click="cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import StreamBarcodeReader from "../components/StreamBarcodeReader.vue"

export default {
  name: 'Contagem',
  components: { Navbar, StreamBarcodeReader },
  data () {
    return {
      api_url: '',
      token: '',
      codBarrasCab: '',
      produtoCab: '',
      derivacaoCab: '',
      lotCab: '',
      descricao: '',
      derivacao: '',
      unidade: '',
      depositoAtu: '',
      depositos: null,
      isScanning: false,
      produtoInv: null
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }
    this.$refs.inputCodBarras.focus()
  },
  methods: {
    checkInvalidLoginResponse (response) {
      if (response === 'Token inválido.') {
        alert('Seu token de acesso não é mais válido. É necessário fazer login novamente.')
        sessionStorage.removeItem('token')
        this.$router.push({ name: 'Login' })
      }
    },
    onDecode (text) {
      document.getElementById('closeModalBarcode').click()
      this.codBarrasCab = text
    },
    onLoaded () {
      console.log('barcode scanner loaded')
    },
    onEnter () {
      const regex = /.*[.].*[.].*/
      if(regex.test(this.codBarrasCab)) {
        const partes = this.codBarrasCab.split('.')
        this.loteCab = partes[0]
        this.produtoCab = partes[1]
        this.derivacaoCab = partes[2]

        this.codBarrasCab = ''
      } else {
        alert('Código de barras com formato inválido!')
      }
    },
    toggleScanner () {
      this.isScanning = !this.isScanning
    },
    buscarProduto () {
      if ((this.produtoCab === '' || this.derivacaoCab === '') && (this.loteCab === '')) {
        alert('Favor preencher o produto e derivação, ou lote!')
      } else {
        this.produtoInv = null
        this.descricao = ''
        this.derivacao = ''
        this.unidade = ''
        this.depositoAtu = ''
        this.depositos = null

        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnBuscar').disabled = true

        const url = (this.produtoCab !== '' && this.derivacaoCab !== '') ? this.api_url + '/dadosProdutoDerivacao?token=' + this.token + '&emp=1&pro=' + this.produtoCab + '&der=' + this.derivacaoCab :
                                                                           this.api_url + '/dadosLote?token=' + this.token + '&emp=1&lote=' + this.loteCab
        
        axios.get(url)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            if(response.data.dados.length === 0) {
              alert('Nenhum produto encontrado!')
            } else {
              this.produtoInv = response.data.dados[0]
              this.produto = this.produtoInv.CODPRO
              this.descricao = this.produtoInv.DESNFV
              this.derivacao = this.produtoInv.CODDER + ' - ' + this.produtoInv.DESCPL
              this.unidade = this.produtoInv.UNIMED
              this.depositoAtu = this.produtoInv.DEPDER !== ' ' ? this.produtoInv.DEPDER : 
                                  this.produtoInv.DEPPRO !== ' ' ? this.produtoInv.DEPPRO :
                                  this.produtoInv.DEPFAM !== ' ' ? this.produtoInv.DEPFAM :
                                  this.produtoInv.DEPORI
                                
              axios.get(this.api_url + '/depositos?token=' + this.token + '&pro=' + codPro + '&der=' + codDer)
                .then((response) => {
                  this.checkInvalidLoginResponse(response.data)
                  if (response.data.dados.length > 0) {
                    this.depositos = response.data.dados
                  }
                })
             }
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnBuscar').disabled = false
          })
      }
    },
    cancelar () {
      this.codBarrasCab = ''
      this.produtoCab = ''
      this.derivacaoCab = ''
      this.loteCab = ''
      this.produtoInv = null
      this.descricao = ''
      this.derivacao = ''
      this.unidade = ''
      this.depositoAtu = ''
      this.depositos = null
      document.getElementById('depositosList').value='0'
      this.$refs.inputCodBarras.focus()
    }
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
