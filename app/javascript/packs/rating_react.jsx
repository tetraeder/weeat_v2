import React from 'react'

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    componentWillMount() {
        var arrTen = [];
        for (var k = 0; k < this.props.restaurant.rating; k++) {
            arrTen.push(<img src="/assets/star.png" className="star"></img>);
        }

        this.setState({
            items: arrTen
        });
    }

    render() {
        return (
            <div>{this.state.items}</div>
        )
    }
}


export default Rating



