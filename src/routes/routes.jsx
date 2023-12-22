import { createBrowserRouter } from "react-router-dom";
import NotFound from "../shared/NotFound/NotFound";
import Main from "../Layout/Main";
import Register from "../page/Register/Register";
import Home from "../page/Home/home";
import Login from "../page/Login/Login";
import ProductDetails from "../page/Home/AllProduct/ProductDetails";
import Cart from "../page/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: '/productDetails/:productId',
        element: <ProductDetails />,
        loader: ({ params }) => fetch(`https://glorious-boa-earrings.cyclic.app/api/v1/product/${params.productId}`)
      },
    ],
  },
]);

export default router;
