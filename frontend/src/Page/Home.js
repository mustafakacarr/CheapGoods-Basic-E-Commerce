import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../Component/Product'
import axios from "axios";
import productList from '../redux/actions/ProductListActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Component/Loader';
import AlertMessage from '../Component/AlertMessage';

function Home() {
  const dispatch = useDispatch();
  const productState = useSelector(state => state.productList)
  const { loading,products,error } = productState;
  useEffect(() => {
   dispatch(productList())
  }, [dispatch]) 
  return (
    <div>
      <h1>Products</h1>
      {loading ? <Loader></Loader>
        : error ? <AlertMessage variant="danger">{error}</AlertMessage> 
          :
          <Row>
            {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                     <Product product={product}/>
                  </Col>
            ))} 
          </Row>
      }
        </div>
  )
}

export default Home