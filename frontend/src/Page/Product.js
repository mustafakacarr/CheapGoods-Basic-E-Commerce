import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import Loader from "../Component/Loader";
import Rating from "../Component/Rating";
import { productDetails } from "../redux/actions/ProductDetailAction";
import { LinkContainer } from "react-router-bootstrap";

function Product() {
  const [quantity, setQuantity] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  useEffect(() => {
    dispatch(productDetails(`${id}`));
  }, [dispatch, id]);

   let navigate = useNavigate();
  const addToCart = () => {
    let path = (`/cart/${id}?quantity=${quantity}`)
    navigate(path)
  }
  
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <Row>
          <div className="header">
            <div className="row">
              <div className="col-md-9">
                <h2 className="product-title underline">{product.name}</h2>
              </div>
              <div className="col-md-3">
                <Rating value={product.rating} color={"#ffdf00"}></Rating>{" "}
              </div>
              <p className="text-right numve">
                <i className="fa fa-eye"></i> {product.numReviews} view
              </p>
            </div>
          </div>
          <div className="container-body mt-20">
            <div className="row">
              <div className="col-md-7">
                <img
                  src={`${product.image}`}
                  className=" img-fluid "
                  width={700}
                />
              </div>
              <div className="col-md-5">
                <ul>
                  <li> Kategori :{product.category} </li>
                  <li> Marka :{product.brand} </li>
                  <li> Stok :{product.countInStock} </li>
                  <li> Fiyat :{product.price} </li>
                </ul>
                <div className="col-md-12">{product.description}</div>

                <div className="col-md-12 mt-20">
                  <br />
                  {product.countInStock > 0 && (
                    <Row>
                      <Col>Adet</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  )}
                </div>
                <br />
                <div className="col-md-12 mt-20">
                  {product.countInStock <= 1 && (
                    <AlertMessage variant="danger">Stokta ürün kalmadı</AlertMessage>
                  )}
                </div>
                <div className="col-md-12 mt-20 d-flex justify-content-center">
                  <Button
                    onClick={addToCart}
                    variant="success"
                    disabled={product.countInStock === 0}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Row>
      )}
    </div>
  );
}

export default Product;
