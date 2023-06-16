import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import './index.scss';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import brandSlicer from "./redux/brand.slicer";
import userSlicer from "./redux/user.slicer";
import categorySlicer from './redux/category.slicer';
import comparisonSlicer from './redux/comparison.slicer';
import currencySlicer from './redux/currency.slicer';
import cartSlicer from './redux/cart.slicer';
import loaderSlicer from './redux/loader.slicer';
import orderSlicer from './redux/order.slicer';

const router = createBrowserRouter(routes);

const store = configureStore({
    reducer : {
      userStore : userSlicer,
      brandStore : brandSlicer,
      categoryStore : categorySlicer,
      comparisonStore : comparisonSlicer,
      currencyStore : currencySlicer,
      cartStore : cartSlicer,
      loaderStore : loaderSlicer,
      orderStore: orderSlicer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
