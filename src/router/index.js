import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/home/index";
import Category from "@/pages/category/index";
import Cart from "@/pages/cart/index";
import GoodsList from "@/pages/goods-list/index";
import GoodsDetail from "@/pages/goods-detail/index";
import GoodsError from "@/pages/goods-nofound/index";

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
  linkExactActiveClass: "active"
});

export default router;
