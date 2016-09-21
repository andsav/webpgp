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
                        );
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
                        <img className="logo" src="key.png" alt="WebPGP" />
                    </a>
                    <ul className="navigation-list float-right">
                        {this.props.links.map((c) => {
                            return <Link
                                key={"link_" + safeId(c.name)}
                                name={c.name}
                                icon={c.icon}
                                active={safeId(c.name) === this.props.active}
                                onChange={this.setActive} />
                        })}
                    </ul>
                </section>
            </nav>
        );
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
        );
    }
}

class Error extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="danger">
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            result: ""
        };
    }
    handleSubmit(e) {
        let data = {};
        let q = e.target.querySelectorAll("input, textarea");

        q.forEach(
            (input) => {
                data[input.id] = input.value;
            }
        );

        this.setState({
           result: (
               <div className="loading"></div>
           )
        });

        try {
            this.props.submitFunction(data, (result) => {
                    this.setState({ result: result });
                }
            );
        } catch(error) {
            this.setState({
                result: <Error message={error}/>
            });
        }

        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="container" onSubmit={this.handleSubmit}>
                    {this.props.children}
                    <center style={{marginTop: '15px'}}>
                        <button type="submit" className="button button-outline button-large">
                            {this.props.submit}
                        </button>
                    </center>
                </form>

                <br />

                {this.state.result}
            </div>
        )
    }
}

class Row extends React.Component {
    render() {
        return (
            <div className="row">
                {this.props.children}
            </div>
        )
    }
}

class Column extends React.Component {
    render() {
        return (
            <div className="column">
                <fieldset>
                    {this.props.children}
                </fieldset>
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor={safeId(this.props.name)}>
                    {this.props.name} {this.props.required !== undefined ? "*" : ""}
                </label>
                <input id={safeId(this.props.name)}
                       type={this.props.type} placeholder={this.props.placeholder}
                       {...this.props} />
            </div>
        );
    }
}

class Textarea extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor={safeId(this.props.name)}>
                    {this.props.name} {this.props.required !== undefined ? "*" : ""}
                </label>
                <textarea id={safeId(this.props.name)} {...this.props} />
            </div>
        );
    }
}
