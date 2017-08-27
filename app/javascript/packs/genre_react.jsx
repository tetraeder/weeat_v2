import React from 'react'

class Genre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    componentWillMount() {
        fetch('https://glacial-garden-10277.herokuapp.com/genres.json').then(response => response.json()).then(json => {
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

export default Genre



