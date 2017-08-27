import React from 'react'
import Card from './card_react'
import Rating from './rating_react'

const Restaurant = (props) => (
    <div className="rest ">
        <p  className="cuisine_font">{props.restaurant.image_url}</p>
        <div className="rest_title">
            <span key={props.restaurant.name} className="menu_label"> {props.restaurant.name} </span>
            <Card className="photoStyle" restaurant={props.restaurant}/>
        </div>
        <p key={props.restaurant.address}> {props.restaurant.address} </p>
        <div className="row">
            <p><span className="rating">Rating:</span></p>
            <Rating className="photoStyle" restaurant={props.restaurant}/>
        </div>
        <p>{props.restaurant.max_delivery_time} minutes</p>

    </div>

)


export default Restaurant



