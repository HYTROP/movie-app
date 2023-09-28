import React from 'react';
import { Rate } from 'antd';
import './Rated.css'

export default function Rated () {
  // const {currentValue} = this.state;
  return (
    <div style={{display:'block', width:'50', padding: 10}}>

    
    <Rate className='rated-stars'
      allowHalf 
      count={10}
      defaultValue={3.5} 
      style={{maxWidth: '20'}}
    onChange={() => {}}
    />
  </div>
  )
  
}
 
