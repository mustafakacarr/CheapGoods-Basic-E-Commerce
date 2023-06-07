import React from 'react'

function Rating(props) {
    const { value, color } = props;
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 != 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++){
        stars.push(<span key={i}><i style={{ color: color  }} className="fa-solid fa-star"></i></span>)
    }
    if (hasHalfStar)
        stars.push(<span key="halfStar"><i style={{ color: color }} className="fas fa-star-half-alt"></i></span>)
  return (
      <div className='rating'>
          {stars.map(star => (star))}
      </div>
  )
}

export default Rating