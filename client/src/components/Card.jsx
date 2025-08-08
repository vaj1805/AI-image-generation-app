import React from 'react'

const Card = ({_id , name, prompt , photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      {/* <img
      className='w-full h-auto object-cover rounded-xl' 
      src={photo}
      alt={prompt}
      /> */}
      Card
    </div>
  )
}


export default Card
