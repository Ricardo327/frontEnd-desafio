const Clientes = {
    template: `
    <div>
       <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-10 mt-5">
                    <h5 class="jumbotron p-4">
                    LISTA DE CLIENTES</h5>                  
                    <div class="card shadow-sm">
                        <div class="card-body">
                        
                        <div class="text-center" v-if="loading">
                            <div class="spinner-border text-success mb-2 mt-3" style="width: 4rem; height: 4rem;" role="status">                                               
                            </div><br/>
                            <span class="text-muted">Carregando...</span>
                        </div>

                        <div v-else> 
                           <input text="type" v-model="search" class="form-control col-md-4" @keyup="pesquisar" placeholder="Pesquisar...">
                            <button class="btn btn-sm btn-outline-primary float-right rounded p-2" data-toggle="modal"
                                data-target="#exampleModal" @click="dadosForm = {},editMode = false,errors = []">CADASTRAR
                                <strong>+</strong></button>
                            <table class="table table-hover">
                                <thead>
                                    <tr class="table-borderless">
                                        <th>NOME</th>
                                        <th>CPF</th>
                                        <th>ENDEREÇO</th>
                                        <th colspan="2">TELEFONE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(dadosForm,index) in dados" :key="index">
                                        <td>{{ dadosForm.nome }}</td>
                                        <td>{{ dadosForm.cpf | formatoCpf }}</td>
                                        <td>{{ dadosForm.endereco }}</td>
                                        <td>{{ dadosForm.telefone }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-success rounded mr-1"
                                                @click="edit(dadosForm)">Editar</button>
                                            <button class="btn btn-sm btn-light text-danger rounded"
                                                @click="destroy(dadosForm)">Excluir</button>
                                        </td>
                                    </tr>
                                    <tr v-if="dados.length == 0">
                                        <td colspan="2" class="text-secondary">Nenhum cliente encontrado</td>
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
                       <span>{{ !editMode ? 'CADASTRAR' : 'EDITAR' }} CLIENTE</span>
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
                               :class="{'is-invalid':errors.nome}">
                           <span class="text-danger" v-if="errors.nome">{{ errors.nome[0] }}</span>
                       </div>

                       <div class="form-group">
                           <label for="cpf" class="text-secondary">CPF</label>                         
                               <the-mask :mask="['###.###.###-##']" v-model="dadosForm.cpf" id="cpf" class="form-control"
                               :class="{'is-invalid':errors.cpf}" placeholder="999.999.999-99"/>                   
                           <span class="text-danger" v-if="errors.cpf">{{ errors.cpf[0] }}</span>
                       </div>

                       <div class="form-group">
                           <label for="endereco" class="text-secondary">ENDEREÇO</label>
                           <input type="text" v-model="dadosForm.endereco" id="endereco" class="form-control"
                               :class="{'is-invalid':errors.endereco}">
                           <span class="text-danger" v-if="errors.endereco">{{ errors.endereco[0] }}</span>
                       </div>
                       
                       <div class="form-group">                  
                           <label for="telefone" class="text-secondary">TELEFONE</label>
                           <the-mask :mask="['(##) ####-####', '(##) #####-####']" v-model="dadosForm.telefone" id="telefone" class="form-control"
                           :class="{'is-invalid':errors.telefone}" placeholder="(99) 99999-9999"/>              
                           <span class="text-danger" v-if="errors.telefone">{{ errors.telefone[0] }}</span>
                       </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                       <button type="submit" class="btn btn-sm btn-primary p-2"
                           :class="{'btn-success':editMode}">{{ !editMode ? 'CADASTRAR' : 'ATUALIZAR' }}</button>
                   </div>
               </form>
           </div>
       </div>
   </div>
   
       </div>
     
  `,
    mixins:[mixins],
    data() {
        return {
            loading:true,
            dados: [],
            dadosForm: {},
            search:'',
            editMode: false,
            url: `${APIURL}/clientes/`,
            urlsearch:`${APIURL}/findClientes/?q=`,
            errors: []
        }
    }, 

}