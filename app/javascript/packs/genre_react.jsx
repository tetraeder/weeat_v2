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

export default Genre



