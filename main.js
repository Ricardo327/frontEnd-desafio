
const APIURL = "http://127.0.0.1:8000/api";

const routes = [
    { path: '/', component: Menu },
    { path: '/clientes', component: Clientes },
    { path: '/produtos', component: Produtos }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
})

const app = new Vue({
    router,
    data: {},
}).$mount('#app')

