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
                <Nav onChange={this.setActive} links={this.props.pages} active={this.state.active} />
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
            <nav>
                <section className="container">
                    <a className="navigation-title" href="https://webpgp.com">
                        <i className="fa fa-key"></i>&nbsp;WebPGP
                    </a>
                    <ul className="navigation-list float-right">
                        {this.props.links.map((c) => {
                            return <Link
                                key={"link_" + safeId(c.name)}
                                name={c.name}
                                icon={c.icon}
                                active={safeId(c.name) === this.props.active}
                                onChange={this.setActive} />
                        })};
                    </ul>
                </section>
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
        let className =(this.props.active ? 'active' : "");
        return (
            <li className={className}>
                <a onClick={this.handleClick} href={"#" + safeId(this.props.name)}>
                    {this.props.name}
                </a>
            </li>
        )
    }
}

class Form extends React.Component {
    render() {
        return (
            <form className="container">
                <div className="row">
                    {this.props.children}
                </div>
                <center style={{marginTop: '15px'}}>
                    <button type="submit" className="button button-outline">
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
            <div className="column">
                <fieldset>
                    <h4>{this.props.name}</h4>
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
