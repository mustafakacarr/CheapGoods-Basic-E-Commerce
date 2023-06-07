import React from 'react'
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './Rating';


function Product(props) {
    const { image,name,_id,category,numReviews,price,rating} = props.product;
  return (
      <div>
          <div className='card mb-10'>
              <div className='card-body'>
                  <div className='card-img-actions'>
                      <img src={image} className="card-img img-fluid"/>
                  </div>
              </div>
              <div className='card-body bg-light text-center'>
                  <div className='mb-2'>
                      <h6>
                          <a href={`/product/${_id}`} className="product-title">{name }</a>
                      </h6>
                      <span className='product-category'>{category}</span>
                  </div>
                            <div><Rating value={rating} color="#ffdf00"></Rating></div>
                  <div className='text-muted mb-3'>
                      {numReviews}
                  </div>
                  <h3 className='mb-10'>{price} $</h3>
                     <LinkContainer to={`/product/${_id}`}>
                      <Button variant='success'><i className='fa-solid fa-cart-shopping'></i> add to cart</Button>
                  </LinkContainer>
              </div>
    
          </div>
       </div>
  )
}

export default Product