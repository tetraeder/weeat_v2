// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// import Genre from 'genre_react.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    componentWillMount() {
        fetch('http://localhost:3000/restaurants.json').then(response => response.json()).then(json => {
            this.setState({items: json})
        })

    }

    update(e) {
        this.setState({name: e.target.value});
    }

    nameFilter(e) {
        this.setState({nameFilter: e.target.value})
    }

    ratingFilter(e) {
        this.setState({ratingFilter: e.target.value})
    }

    deliveryFilter(e) {
        this.setState({deliveryFilter: e.target.value})
    }

    genreFilter(e) {
        console.log(e)
        this.setState({genreFilter: e.target.value})
        console.log("filter" + e.target.value)
    }

    render() {
        let items = this.state.items
        if (this.state.nameFilter) {
            items = items.filter(item => item.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
        }
        if (this.state.ratingFilter) {
            items = items.filter(item => item.rating >= this.state.ratingFilter)
        }

        if (this.state.deliveryFilter){
            items = items.filter(item => item.max_delivery_time <= this.state.deliveryFilter)
        }

        if (this.state.genreFilter) {
            items = items.filter(item =>
                (item.genre_id == this.state.genreFilter) || (this.state.genreFilter == -1)
            )
        }

        let rendered_items = <h4> No Restaurants Found </h4>

        if (items.length > 0){
            rendered_items =  items.map(item =>
                <Restaurant key={item.id} restaurant={item}/>)
        }

        return (
            <div>
                <header className="wrapper" >
                    <h1>WeEat</h1>
                    <h2>Where do you want to eat?</h2>
                    <rest-filter>
                        Search <input type="text" onChange={this.nameFilter.bind(this)}/>
                    </rest-filter>
                </header>

                <header className="sub sub-wrapper">
                    <rest-filter>
                        Cuisine <Genre onChange={this.genreFilter.bind(this)}/>
                    </rest-filter>

                    <rest-filter>
                        Rating Above <input type="text" onChange={this.ratingFilter.bind(this)}/>
                    </rest-filter>

                    <rest-filter>
                        Delivery Time <input type="text" onChange={this.deliveryFilter.bind(this)}/>
                    </rest-filter>
                </header>
                <div className="sub-wrapper">
                    <div className="rest-list">
                        <div >
                            {rendered_items}
                        </div>
                    </div>
                </div>
                <div className="col-8">

                </div>
            </div>
        )
    }
}


class Genre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    componentWillMount() {
        fetch('http://localhost:3000/genres.json').then(response => response.json()).then(json => {
            var arrTen = [];
            arrTen.push(<option key="-1" value="-1"> All </option>);
            for (var k = 0; k < json.length; k++) {
                arrTen.push(<option key={json[k].id} value={json[k].id}> {json[k].name} </option>);
            }

            this.setState({
                items: arrTen
            });
        })
    }

    onGenreSelected(value) {
        this.props.onChange(value)
    }

    render() {
        return (
            <select className="cuisine-select" onChange={this.onGenreSelected.bind(this)}>
                {this.state.items}
            </select>
        )
    }
}

App.propTypes = {
    name: React.PropTypes.string
}

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

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.restaurant.card ?  <img src="/assets/card.png" className="card"></img> : null}</div>;
    }
}


const Restaurant = (props) => (
    <div className="rest ">
        <p className="logo">{props.restaurant.image_url}</p>
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


const Widget = (props) => (
    <input type="text" onChange={props.update}/>
)

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(
        <App name="yalla"/>,
        document.body.appendChild(document.createElement('div')),
    )
})


