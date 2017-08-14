// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      name : "balagan"
    }
  }
  update(e){
    this.setState({name: e.target.value});
  }

  render(){
      return <div>
        <h1>
            {this.state.name} Rishonia!
        </h1>
        <Widget update={this.update.bind(this)}/>
      </div>
  }
}

App.propTypes = {
    name: React.PropTypes.string
}

const Widget = (props) => (
    <input type="text" onChange={props.update} />
)

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <App name="yalla"/>,
    document.body.appendChild(document.createElement('div')),
  )
})


