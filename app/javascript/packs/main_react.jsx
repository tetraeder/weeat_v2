// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Genre from './genre_react'
import Restaurant from './restaurant_react'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    componentWillMount() {
        fetch('https://glacial-garden-10277.herokuapp.com/restaurants.json').then(response => response.json()).then(json => {
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
        let rendered_items = this.filter_restaurants();

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
                        Delivery Time Up To <input type="text" onChange={this.deliveryFilter.bind(this)}/>
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

    filter_restaurants() {
        let items = this.state.items
        if (this.state.nameFilter) {
            items = items.filter(item => item.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
        }
        if (this.state.ratingFilter) {
            items = items.filter(item => item.rating >= this.state.ratingFilter)
        }

        if (this.state.deliveryFilter) {
            items = items.filter(item => item.max_delivery_time <= this.state.deliveryFilter)
        }

        if (this.state.genreFilter) {
            items = items.filter(item =>
                (item.genre_id == this.state.genreFilter) || (this.state.genreFilter == -1)
            )
        }

        let rendered_items = <h4> No Restaurants Found </h4>

        if (items.length > 0) {
            rendered_items = items.map(item =>
                <Restaurant key={item.id} restaurant={item}/>)
        }
        return rendered_items;
    }
}


App.propTypes = {
    name: React.PropTypes.string
}

const Widget = (props) => (
    <input type="text" onChange={props.update}/>
)

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(
        <App name="yalla"/>,
        document.body.appendChild(document.createElement('div')),
    )
})


