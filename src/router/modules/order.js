import Layout from '@/layout'

const orderRouter = {
    path: '/orderList',
    name: 'Order',
    component: Layout,
    redirect: '/orderList/index',
    meta: {
        roles: ['admin'],
        title: '订单管理',
        icon: 'wenjuan'
    },
    children: [
        {
            path: 'index',
            name: 'allOrder',
            meta: {title: '全部订单'},
            component: () => import('@/views/order/index')
        },
        {
            path: 'sendSetting',
            name: 'sendSetting',
            meta: {title: '发货设置'},
            component: () => import('@/views/order/sendSetting')
        }
    ]
}

export default orderRouter