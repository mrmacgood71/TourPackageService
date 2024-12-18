import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import HotelPage from '../components/HotelPage.vue';
import AviaTicketPage from '../components/AviaTicketPage.vue';
import UserProfilePage from '../components/UserProfilePage.vue';
import HotelDetailPage from "../components/HotelDetailPage.vue";
import AuthPage from "../components/AuthPage.vue";
import VoucherPage from "@/components/VoucherPage.vue";
import VoucherDetailPage from "@/components/VoucherDetailPage.vue";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthPage
    },
    {
        path: '/hotel',
        name: 'hotel',
        component: HotelPage,
    },
    {
        path: '/avia-ticket',
        name: 'avia-ticket',
        component: AviaTicketPage,
    },
    {
        path: '/user-profile',
        name: 'user-profile',
        component: UserProfilePage,
    },
    {
        path: '/tour-package',
        name: 'tour-package',
        component: VoucherPage
    },
    {
        path: '/vouchers/details',
        name: 'voucher-details',
        component: VoucherDetailPage,
        props: true,
        // props: (route) => ({ voucher: route.params.voucher }), // Pass the voucher object as a prop
    },
    {
        path: '/hotel/:id',
        name: 'hotel-detail',
        component: HotelDetailPage,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;