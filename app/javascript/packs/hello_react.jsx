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

        if (this.state.genreFilter ) {
            items = items.filter(item =>
                (item.genre_id == this.state.genreFilter) || (this.state.genreFilter == -1)
            )
        }

        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>WeEat</h1>
                    <p>Where do you want to eat?</p>
                </div>

                Genre: <Genre onChange={this.genreFilter.bind(this)}/>
                Name: <input type="text" onChange={this.nameFilter.bind(this)}/>
                Rating Above: <input type="text" onChange={this.ratingFilter.bind(this)}/>
                {items.map(item =>
                    <Restaurant key={item.id} restaurant={item}/>)
                }
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
            arrTen.push(<option key="-1" value="-1"> --- </option>);
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
            <select onChange={this.onGenreSelected.bind(this)}>
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
            arrTen.push("*");
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

const Restaurant = (props) => (
    <div>
        <h4 key={props.restaurant.name}> {props.restaurant.name} </h4>
        <h5 key={props.restaurant.address}> {props.restaurant.address} </h5>
        {/*<h5 key={props.restaurant.rating}> {props.restaurant.rating} </h5>*/}
        <Rating  restaurant = {props.restaurant}/>
        <br/>
        <br/>
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


