import React, {memo} from 'react';

import OrderList from '../OrderList/OrderList';

import './App.scss';

const App = () => {
  return (
    <main className="app">
      <OrderList/>
    </main>
  );
}

export default memo(App);
