

export default {
    name: 'daybook',
    component: () => import(/* webpackChunckName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunckName: "daybook-NoEntry" */ '@/modules/daybook/views/NoEntrySelected.vue')
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunckName: "daybook-entry" */ '@/modules/daybook/views/EntryView.vue'),
            // Envia al componenete estas props
            props: ( route ) => {
                // del objecto route extrae los params
                return {
                    id: route.params.id // enviale la propiedad id con lo que haya en params.id
                }
            }
        }
    ]
}