import React, { useState, useEffect } from 'react';

import useToken from '../../hooks/useToken';
import {getOrderItems} from '../../service/apiService';
import OrderTable from '../OrderTable/OrderTable';
import Spinner from '../Spinner/Spinner';

import './OrderList.scss';

const OrderList = () => {
  const [{isTokenLoading, accessTokenData: {accessToken}}] = useToken();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(isTokenLoading){
      return;
    }
    getOrderItems(accessToken)
      .then(responce => setOrders(responce.Result));
  }, [isTokenLoading, accessToken])
  console.log(orders);

  const loading = () => {
    return (
      <div className="spinner">
        <Spinner/>
      </div>
    );
  };

  const content = () => {
    return (
      <>
        <h1>Orders</h1>
        <OrderTable orders={orders}/>
      </>
    )
  }

  const showContent = !isTokenLoading ? content() : loading();

  return (
    <div className="container">
      {showContent}
    </div>
  );
};

export default OrderList;
