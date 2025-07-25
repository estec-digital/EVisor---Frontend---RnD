import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/auth';
import LoginPage from "../views/auth/LoginPage.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
// import ContractReviewPage from "../views/main/ContractReviewPage.vue";
// import DashboardPage from "../views/main/DashboardPage.vue";
import ChatPage from "../views/main/ChatPage.vue";
// import ContractsPage from "../views/main/ContractsPage.vue";
// import SettingsPage from "../views/main/SettingsPage.vue";
// import ProfilePage from '../views/profile/ProfilePage.vue';
// import { onAuthStateChanged, auth } from "../firebase";
import MesxDashboard from "../views/MESX/mesxDashboard.vue";
import WmsxDashboard from "../views/WMSX/wmsxDashboard.vue";
import QmsxDashboard from "../views/QMSX/qmsxDashboard.vue";
import MmsxDashboard from "../views/MMSX/mmsxDashboard.vue";
import PmsxDashboard from "../views/PMSX/pmsxDashboard.vue";
import TimeTrackingPage from "../views/time-tracking/TimeTrackingPage.vue";
import SummaryDashboard from "../views/dashboard/SummaryDashboard.vue";
import { ElMessageBox } from "element-plus";
import RnDDashboard from "../views/RnD/RnDDashboard.vue";
import RndWorkManagement from "../views/RnD/RndWorkManagement.vue";
import WorkManagementKHTC from "../views/time-tracking/WorkManagementKHTC.vue";

const routes = [
  {
    path: '/',
    redirect: '/summary-dashboard',
    meta: { requiresAuth: true } // Request login to access the default routes
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { guestOnly: true } // Only allow guest (do not login) accept
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { guestOnly: true } // Only allow guest (do not login) accept
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/NotFoundPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/NotFoundPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mesx',
    name: 'MESX',
    component: MesxDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/wmsx',
    name: 'WMSX',
    component: WmsxDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/qmsx',
    name: 'QMSX',
    component: QmsxDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/mmsx',
    name: 'MMSX',
    component: MmsxDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/pmsx',
    name: 'PMSX',
    component: PmsxDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/time-tracking',
    name: 'TimeTracking',
    component: TimeTrackingPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue') // Lazy load 404 page
  },
  {
    path: '/summary-dashboard',
    name: 'SummaryDashboard',
    component: SummaryDashboard,
    meta: { 
      requiresAuth: true,
      titleKey: 'SummaryDashboard' 
    }
  },
  {
    path: '/workshop-summary-dashboard',
    name: 'MESXDashboard',
    component: SummaryDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/rnd-dashboard',
    name: 'RndDashboard',
    component: RnDDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/rnd-work-tracking',
    name: 'RndWorkTracking',
    component: RndWorkManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/work-management-khtc',
    name: 'KHTCWorkManagement',
    component: WorkManagementKHTC,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global Navigation Guard
// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//   /**
//    * Ensure the user status is checked (for example, from localstorage)
//    * Before Route Guard runs if you load the page
//    * The better way is to perform the token check in the Pinia Store when the app starts.
//    */
//   if (!authStore.isLoggedIn && authStore.token) {
//     await authStore.checkAuth(); // Check the token if it is in localstorage but not login
//   }

//   const isLoggedIn = authStore.isLoggedIn;
  
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     // If router request login but user do not login, redirect to login page
//     next({ name: 'Login' });
//   } else if (to.meta.guestOnly && isLoggedIn) {
//     // If the route is only for guests (login/register) that users have logged in, shifted to the main page
//     next({ name: 'Chat' }); // Or can redirect to dashboard page
//   } else {
//     next(); // Allow accept to system
//   }
// });

// Global Navigation Guard
// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();

//   // Đợi cho trạng thái Firebase Auth được khởi tạo (onAuthStateChanged đã chạy lần đầu)
//   if (!authStore.authReady) {
//     // Nếu authReady là false, đợi một chút (hoặc sử dụng Promise)
//     // Cách này không lý tưởng cho production nhưng đơn giản cho debug
//     await new Promise(resolve => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             unsubscribe(); // Ngừng lắng nghe sau khi trạng thái được xác định
//             resolve();
//         });
//     });
//   }

//   const isLoggedIn = authStore.isLoggedIn; // Sau khi đợi, isLoggedIn sẽ chính xác

//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next({ name: 'Login' });
//   } else if (to.meta.guestOnly && isLoggedIn) {
//     next({ name: 'Chat' });
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Đảm bảo authStore đã sẵn sàng. Nếu chưa, chạy checkAuth.
  // Điều này cần thiết cho lần đầu tải trang hoặc khi refresh.
  if (!authStore.authReady) {
    await authStore.checkAuth();
  }

  const isLoggedIn = authStore.isLoggedIn;
  const isTokenStillValid = authStore.isTokenValid;

  // 1. Nếu route yêu cầu xác thực
  if (to.meta.requiresAuth) {
    if (!isLoggedIn || !isTokenStillValid) {
      console.log('Router Guard: Chưa đăng nhập hoặc token đã hết hạn. Chuyển hướng về Login.');
      
      // Gọi handleSessionExpired để hiển thị popup (nếu cần) và xóa dữ liệu
      // handleSessionExpired đã có logic kiểm tra to.name !== 'Login' và .el-overlay-message-box
      await authStore.handleSessionExpired(); 
      
      next('/login'); // Chắc chắn chuyển hướng về trang login
    } else {
      // Đã đăng nhập và token còn hạn, cho phép đi tiếp
      console.log('Router Guard: Đã đăng nhập và token còn hạn. Cho phép truy cập.');
      next();
    }
  } 
  // 2. Nếu route là login/register và người dùng đã đăng nhập (và token còn hạn)
  else if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn && isTokenStillValid) {
    console.log('Router Guard: Đã đăng nhập và token còn hạn. Chuyển hướng từ Login/Register về Dashboard.');
    next('/summary-dashboard');
  } 
  // 3. Các trường hợp còn lại (route không yêu cầu xác thực)
  else {
    console.log('Router Guard: Cho phép truy cập route không yêu cầu xác thực hoặc đã xử lý.');
    next();
  }
});


export default router;