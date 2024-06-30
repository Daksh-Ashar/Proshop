import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Importing Redux Store
import store from './store.js'
import {HelmetProvider } from 'react-helmet-async';
//Importing custom bootstrap and css
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
// Importing all screens
import App from './App';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen  from "./screens/ProfileScreen.jsx";
import AdminRoute from './components/AdminRoute.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderListScreen from './screens/Admin/OrderListScreen.jsx';
import ProductListScreen from './screens/Admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/Admin/ProductEditScreen.jsx';
import UserListScreen from './screens/Admin/UserListScreen.jsx';
import UserEditScreen from './screens/Admin/UserEditScreen.jsx';

const initialOptions = {
  "client-id": "https://sandbox.paypal.com",
  "enable-funding": "venmo",
  "disable-funding": "",
  country: "US",
  currency: "USD",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen/>} />
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      <Route path="" element={<PrivateRoute/>}>
          <Route path="/shipping" element={<ShippingScreen/>} />
          <Route path="/payment" element={<PaymentScreen/>} />
          <Route path="/placeorder" element={<PlaceOrderScreen/>} />
          <Route path="/order/:id" element={<OrderScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
      </Route>
      <Route path="" element={<AdminRoute/>}>
          <Route path="/admin/orderlist" element={<OrderListScreen/>} />
          <Route path="/admin/productlist" element={<ProductListScreen/>} />
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
          <Route path="/admin/userlist" element={<UserListScreen/>} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <PayPalScriptProvider deferLoading={true} options={initialOptions}>
      <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
