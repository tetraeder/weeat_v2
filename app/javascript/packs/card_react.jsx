import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.restaurant.card ?  <img src="/assets/card.png" className="card"></img> : null}</div>;
    }
}

export default Card



