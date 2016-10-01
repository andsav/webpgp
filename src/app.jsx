class Input extends React.Component {
    getName(){
        return this.props.name.toLowerCase().split(' ').join('-')
    }
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.getName()}>{this.props.name}</label>
                <input id={this.getName()} type={this.props.type} placeholder={this.props.placeholder} />
            </div>
        )
    }
}



ReactDOM.render(
    <Input name="Name" type="text" placeholder="Full name" />,
    document.getElementById('generate'));

