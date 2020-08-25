import Login from "../components/login/login"
import Register from "../components/register/register"
// import Dashboard from "../components/dashboard/dashboard";
import AddOrEditProduct from "../components/addOrEditProduct/addOrEditProduct";
import ListAllProducts from "../components/listAllProducts/listAllProducts";
import Home from "../components/home/home";
import ProductDetailTile from "../components/productDetailTile/productDetailTile";

const routes = [
    {
        path: "/login",
        component: Login,
        access: "public"
    },
    {
        path: "/register",
        component: Register,
        access: "public"
    },
    {
        path: "/",
        component: Home,
        access: "private"
    },
    {
        path: "/addoredit",
        component: AddOrEditProduct,
        access: "private"
    },
    {
        path: "/listAll",
        component: ListAllProducts,
        access: "private"
    },
    {
        path: "/productDetail",
        component: ProductDetailTile,
        access: "private"
    }
]

export default routes;