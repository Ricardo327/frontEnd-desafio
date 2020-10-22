
var mixins = {
    mounted() {
        this.obterDados()
    },
    methods: {
        pesquisar() {
            axios
                .get(this.urlsearch + this.search)
                .then(data => {
                    this.dados = data.data
                })
                .catch(() => { });
        },
        obterDados() {
            axios.get(this.url).then(resp => {
                this.dados = resp.data.dados
            }).catch(error => {

            }).finally(() => {
                this.loading = false
            })
        },
        add() {
            this.loadingForm = true
            axios.post(this.url, this.dadosForm)
                .then(resp => {
                    this.obterDados()
                    $('#exampleModal').modal('hide')
                    this.messageSuccess('Cadastrado')
                }).catch(error => {
                    this.error(error)
                }).finally(() => {
                    this.loadingForm = false
                })
        },
        edit(dadosForm) {
            this.errors = []
            this.editMode = true
            this.dadosForm = dadosForm
            $('#exampleModal').modal('show')
        },
        update() {
            // this.$set(this.dados, index, this.dadosForm)
            this.loadingForm = true
            axios.put(this.url + this.dadosForm.id, this.dadosForm).then(resp => {
                $('#exampleModal').modal('hide')
                this.messageSuccess('Atualizado')
            }).catch(error => {
                this.error(error)
            }).finally(() => {
                this.loadingForm = false
            })
        },
        destroy(dadosForm) {
            Swal.fire({
                // messagem de de exclusão
                title: "Excluir registro?",
                text: "Você não poderá reverter isso!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Cancelar"
            }).then(result => {
                if (result.value) {
                    axios.delete(this.url + dadosForm.id).then(resp => {
                        this.obterDados()
                        Swal.fire('Excluído com sucesso!', '', 'success')
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })

        },
        messageSuccess(msg) {
            Toast.fire({
                icon: 'success',
                title: msg + ' com sucesso!'
            })
        },
        error(error) {
            if (error.response.status == 422) {
                this.errors = error.response.data.errors
            }
        }
    },
    filters: {
        formatoCpf(cpf) {
            cpf = cpf.replace(/[^\d]/g, "");
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
        formatoValor(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatoData(value) {
            return moment(value).locale('pt-br').format('DD/MM/YYYY');
        },
    }
}
