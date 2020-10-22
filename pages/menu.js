const Menu = {
    template: `
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10 mt-5">
            <h5 class="jumbotron p-4">MENU CRUD</h5>
            <div class="card shadow-sm">
                <div class="card-body">  
                <table class="table table-hover">
                   <tbody>
                      <tr class="table-borderless" @click="clientes" style="cursor:pointer">
                        <td>
                          <i data-eva="people-outline"></i>
                           <span>CLIENTES</span>                           
                        </td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23">                              
                              <path style="fill: #7e7f80" d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"/>
                            </svg>
                        </td>
                      </tr>
                      <tr @click="produtos" style="cursor:pointer">
                       <td>                    
                         <i data-eva="list-outline"></i>                    
                         PRODUTOS   
                       </td>
                       <td>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23">                              
                              <path style="fill: #7e7f80"  d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"/>
                            </svg>
                       </td>
                      </tr>
                  </tbody>
                </table>                     
              
                </div>
            </div>
        </div>
    </div>
</div>     
    `,
    methods: {
        clientes() {
            this.$router.push('/clientes')
        },
        produtos() {
            this.$router.push('/produtos')
        }
    }
}
