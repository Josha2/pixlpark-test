import React, {useState} from 'react';

import Pagination from '../../helpers/Paginations';

import './OrderTable.scss';

const OrderTable = ({orders}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);

  const paginate = (currentPage) => {
    setCurrentPage(currentPage)
  };

  const nextPage = (currentGroup) => {
    if(currentGroup.length > 5){
      setCurrentPage(currentPage + 1);
    };
  };

  const prevPage = (currentPage) => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    };
  };

  const indexOfLastItem = currentPage * dataPerPage;
  const IndexOfFirstItem = indexOfLastItem - dataPerPage;
  const ordersGroup = orders.slice(IndexOfFirstItem, indexOfLastItem);

  const renderOrders = ordersGroup.map((item, i) => {
    const {CustomId, DeliveryAddress, PreviewImageUrl, Price, PaymentStatus, Title, TotalPrice} = item;
    const {AddressLine1, City, Country, FullName, Phone} = DeliveryAddress ?? {};
    const country = Country ? <span>{Country}, </span> : null;
    const city = City ? <span>{City}, </span> : null;
    
    return (
      <tr key={i}>
        <td>#{CustomId}</td>
        <td>{Title}</td>
        <td>
          <div className="image-td">
            <img src={PreviewImageUrl} alt=""/>
          </div>
        </td>
        <td>
          <div>
          <p>
            {country}{city}{AddressLine1} <br/>
            {FullName} <br/>
            {Phone}
          </p>
          </div>
        </td>
        <td>{Price}</td>
        <td>{TotalPrice}</td>
        <td>{PaymentStatus}</td>
      </tr>
    )
  });
 
  return (
    <div className="table-container">
      <table className="table-order">
        <thead>
          <tr> 
            <th className="th-1">Order Id</th>
            <th className="th-2">Product</th>
            <th className="th-3">Img</th>
            <th className="th-4">Delivery Address</th>
            <th className="th-5">Price</th>
            <th className="th-6">Total</th>
            <th className="th-7">Status</th>
          </tr>
        </thead>
        <tbody>
          {renderOrders}
        </tbody>
      </table>
      <Pagination
        dataPerPage={dataPerPage}
        totalPages={orders.length}
        currentGroup={ordersGroup}
        currentPage={currentPage}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default OrderTable;