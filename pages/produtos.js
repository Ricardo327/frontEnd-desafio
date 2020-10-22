const Produtos = {
    template: `
 <div>
   <div class="container">
    <div class="row justify-content-center">
       <div class="col-md-10 mt-5">
           <h5 class="jumbotron p-4">LISTA DE PRODUTOS</h5>                  
           <div class="card shadow-sm">
               <div class="card-body">

                  <div class="text-center" v-if="loading">
                     <div class="spinner-border text-success mb-2 mt-3" style="width: 4rem; height: 4rem;" role="status">                                               
                      </div><br/>
                      <span class="text-muted">Carregando...</span>
                     </div>

                <div v-else> 
                  <input text="type" class="form-control col-md-4" v-model="search" @keyup="pesquisar" placeholder="Pesquisar...">
                   <button class="btn btn-sm btn-outline-primary float-right rounded p-2" data-toggle="modal"
                       data-target="#exampleModal" @click="dadosForm = {},editMode = false,errors = []">CADASTRAR
                       <strong>+</strong></button>
                   <table class="table table-hover">
                       <thead>
                           <tr class="table-borderless">
                               <th>DESCRIÇÃO</th>
                               <th>PREÇO</th>
                               <th colspan="2">DATA DE ENTRADA</th>                          
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(dadosForm,index) in dados" :key="index">
                               <td>{{ dadosForm.nome }}</td>
                               <td>{{ dadosForm.preco_da_compra | formatoValor }}</td>
                               <td>{{ dadosForm.data_da_entrada | formatoData }}</td>                     
                               <td>
                                   <button class="btn btn-sm btn-outline-success rounded mr-1"
                                       @click="edit(dadosForm)">Editar</button>
                                   <button class="btn btn-sm btn-light text-danger rounded"
                                       @click="destroy(dadosForm)">Excluir</button>                                                                         
                               </td>
                           </tr>     
                           <tr v-if="dados.length == 0">
                            <td colspan="2" class="text-secondary">Nenhum produto encontrado</td>
                           </tr>                  
                       </tbody>
                   </table>
                 </div>
               </div>
           </div>
       </div>
   </div>
    </div>  
    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-2">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    <span>{{ !editMode ? 'CADASTRAR' : 'EDITAR' }} PRODUTO</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form @submit.prevent="!editMode ? add() : update()">
                <div class="modal-body">

                    <div class="form-group">
                        <label for="nome" class="text-secondary">NOME</label>
                        <input type="text" v-model="dadosForm.nome" id="nome" class="form-control"
                            :class="{'is-invalid':errors.nome}" :disabled="loadingForm">
                        <span class="text-danger" v-if="errors.nome">{{ errors.nome[0] }}</span>
                    </div>

                    <div class="form-group">             
                     <label for="preco_da_compra" class="text-secondary">PREÇO</label>                    
                        <money v-bind="money" v-model="dadosForm.preco_da_compra" id="preco_da_compra" class="form-control"
                        :class="{'is-invalid':errors.preco_da_compra}" :disabled="loadingForm"></money> 
                        <span class="text-danger" v-if="errors.preco_da_compra">{{ errors.preco_da_compra[0] }}</span>
                    </div>                 

                    <div class="form-group">
                    <label for="data_da_entrada" class="text-secondary">DATA DE ENTRADA</label>
                    <input type="date" v-model="dadosForm.data_da_entrada" id="data_da_entrada" class="form-control"
                        :class="{'is-invalid':errors.data_da_entrada}" :disabled="loadingForm">
                    <span class="text-danger" v-if="errors.data_da_entrada">{{ errors.data_da_entrada[0] }}</span>
                   </div>  
                                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>                   
                
                    <button type="submit" class="btn btn-sm btn-primary p-2"
                        :class="{'btn-success':editMode}" :disabled="loadingForm">
                        <span v-if="loadingForm">
                         <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                         {{ !editMode ? 'SALVANDO...' : 'ATUALIZANDO...' }}
                        </span>                        
                        <span v-else>{{ !editMode ? 'CADASTRAR' : 'ATUALIZAR' }}</span></button>
                </div>
            </form>
        </div>
    </div>
  </div>
 </div>   
   ` , mixins: [mixins],
    data() {
        return {
            loadingForm:false,
            loading:true,
            dados: [],
            dadosForm: {},
            editMode: false,
            url: `${APIURL}/produtos/`,
            urlsearch:`${APIURL}/findProdutos/?q=`,
            errors: [],
            search:'',   
            money: {
                decimal: ",",
                thousands: ".",
                prefix: "R$ ",    
                precision: 2,
                masked: false,
            },
        }
    },
}
