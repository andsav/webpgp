class Page extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = this.setActive.bind(this);
        this.state = {
            active: window.location.hash === ""
                ? DEFAULT_PAGE
                : window.location.hash.substr(1)
        };
    }
    componentWillMount() {
        window.changePage = (a) => {
            this.setState({
                active: a
            });
        }
    }
    setActive(a) {
        this.setState({
            active: a
        });
    }
    render() {
        return(
            <div>
                <header className="header">
                    <Nav onChange={this.setActive} links={this.props.pages} active={this.state.active} />
                </header>
                <div id="pages">
                    {this.props.pages.map((p) => {
                        let style = {"display": safeId(p.name) === this.state.active ? "block" : "none" };
                        return (
                            <div style={style} key={"page_" + safeId(p.name)} id={safeId(p.name)}>
                                {p.form}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = this.setActive.bind(this);
    }
    setActive(a) {
        this.props.onChange(a);
    }
    render() {
        return (
            <nav className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                <ul className="pure-menu-list">
                    {this.props.links.map((c) => {
                        return <Link
                            key={"link_" + safeId(c.name)}
                            name={c.name}
                            icon={c.icon}
                            active={safeId(c.name) === this.props.active}
                            onChange={this.setActive} />
                    })};
                </ul>
            </nav>
        )
    }
}

class Link extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.onChange(safeId(this.props.name));
        history.pushState(null, this.props.name, "#" + safeId(this.props.name));
    }
    render() {
        let className = "pure-menu-item " + (this.props.active ? 'pure-menu-selected' : "");
        return (
            <li className={className}>
                <a onClick={this.handleClick}
                    href={"#" + safeId(this.props.name)}
                    className="pure-menu-link">
                    <i className={"fa fa-" + this.props.icon}></i> {this.props.name}
                </a>
            </li>
        )
    }
}

class Form extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-aligned">
                <div className="pure-g">
                    {this.props.children}
                </div>
                <center style={{marginTop: '15px'}}>
                    <button type="submit" className="pure-button pure-button-primary">
                        {this.props.submit}
                    </button>
                </center>
            </form>
        )
    }
}

class Column extends React.Component {
    render() {
        return (
            <div className="pure-u-1-2">
                <fieldset>
                    <legend>{this.props.name}</legend>
                    {this.props.children}
                </fieldset>
            </div>
        )
    }
}

class Input extends React.Component {
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={safeId(this.props.name)}>{this.props.name}</label>
                <input id={safeId(this.props.name)} type={this.props.type} placeholder={this.props.placeholder} />
            </div>
        )
    }
}

class Textarea extends React.Component {
    render() {
        return (
            <textarea className="pure-input-u" id={safeId(this.props.name)} placeholder={this.props.placeholder}>
            </textarea>
        )
    }
}
