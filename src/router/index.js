import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/home/index";
import Category from "@/pages/category/index";
import Cart from "@/pages/cart/index";
import User from "@/pages/user/index";
import UserAddress from "@/pages/user-address/index";
import UserInfo from "@/pages/user-info/index";
import AddAddress from "@/pages/add-address/index";
import GoodsList from "@/pages/goods-list/index";
import GoodsDetail from "@/pages/goods-detail/index";
import GoodsError from "@/pages/goods-nofound/index";
import Login from "@/pages/login/index";
import Register from "@/pages/register/index";
import Coupon from "@/pages/coupon/index";
import Order from "@/pages/order/index";
import OrderPay from "@/pages/order-pay/index";
import OrderAddress from "@/pages/order-address/index";
import { Token } from "@/utils/token";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/user/address",
    name: "UserAddress",
    component: UserAddress
  },
  {
    path: "/user/info",
    name: "UserInfo",
    component: UserInfo
  },
  {
    path: "/user/add-address",
    name: "AddAddress",
    component: AddAddress
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/coupon",
    name: "Coupon",
    component: Coupon
  },
  {
    path: "/order",
    name: "Order",
    component: Order
  },
  {
    path: "/order/pay",
    beforeEach(to, from, next) {
      const id = to.query.id;
      if (!/^\d+$/.test(id)) {
        next("/");
      } else {
        next();
      }
    },
    name: "OrderPay",
    component: OrderPay
  },
  {
    path: "/order/address",
    name: "OrderAddress",
    component: OrderAddress
  },
  {
    path: "/goods-list",
    name: "GoodsList",
    props: route => {
      let cid = route.query.cat_id || 0;
      const cname = route.query.cname || "";
      if (isNaN(cid)) {
        cid = 0;
      }
      return {
        cid: parseInt(cid),
        cname
      };
    },
    component: GoodsList
  },
  {
    path: "/goods-detail",
    redirect: "/"
  },
  {
    path: "/goods-detail/:id",
    beforeEnter(to, from, next) {
      const id = to.params.id;
      if (!/^\d+$/.test(id)) {
        next(from.path);
      } else {
        next();
      }
    },
    props: route => {
      return {
        id: parseInt(route.params.id)
      };
    },
    name: "GoodsDetail",
    component: GoodsDetail
  },
  {
    path: "/goods-error",
    name: "GoodsError",
    component: GoodsError
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

// 需要做登录验证的路由名称
const AUTH_ROUTER_NAME = [
  "Coupon",
  "Order",
  "User",
  "UserAddress",
  "AddAddress",
  "OrderAddress",
  "OrderPay"
];
// 登录验证
router.beforeEach((to, from, next) => {
  if (AUTH_ROUTER_NAME.includes(to.name)) {
    const token = Token.getToken();
    if (token === "") {
      // console.log(from);
      // console.log(to);
      let url;
      if (to.query.loginRedirect) {
        console.log(1, to.query.loginRedirect);
        url = decodeURIComponent(to.query.loginRedirect);
      } else {
        console.log(2);
        url = encodeURIComponent(to.path);
      }
      next(`/login?url=${url}`);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
