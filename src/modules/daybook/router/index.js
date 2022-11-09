

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
            component: () => import(/* webpackChunckName: "daybook-entry" */ '@/modules/daybook/views/EntryView.vue')
        }
    ]
}