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
        };
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
        );
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = this.setActive.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    setActive(a) {
        this.props.onChange(a);
    }

    menuClick(e) {
        e.preventDefault();
        e.target.parentNode.classList.toggle("active");
        this.refs.navbar.classList.toggle("active");
    }

    render() {
        return (
            <nav ref="navbar">
                <section className="container">
                    <a className="navigation-title" href="https://webpgp.com">
                        <img className="logo" src="key.png" alt="WebPGP" />
                    </a>
                    <ul ref="menu" className="navigation-list float-right">
                        <li>
                            <a onClick={this.menuClick} href="">Menu</a>
                        </li>
                        {this.props.links.map((c) => {
                            return <Link
                                key={"link_" + safeId(c.name)}
                                name={c.name}
                                icon={c.icon}
                                active={safeId(c.name) === this.props.active}
                                onChange={this.setActive}
                                mobile={false} />
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
        let className =(this.props.active ? "active" : "");
        return (
            <li className={className}>
                <a onClick={this.handleClick} href={"#" + safeId(this.props.name)}>
                    {this.props.name}
                </a>
            </li>
        );
    }
}

class Alert extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className={this.props.type}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

class Error extends React.Component {
    render() {
        return (
            <Alert type="danger">
                {this.props.message}
            </Alert>
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
                    this.setState({ result });
                    this.refs.result.scrollIntoView();
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
                    <center style={{marginTop: "15px"}}>
                        <button type="submit" className="button button-outline button-large">
                            {this.props.submit}
                        </button>
                    </center>
                </form>

                <br />

                <div ref="result">{this.state.result}</div>
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
    expand(e) {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    render() {
        return (
            <div>
                <label htmlFor={safeId(this.props.name)}>
                    {this.props.name} {this.props.required !== undefined ? "*" : ""}
                </label>
                <textarea onKeyUp={this.expand} id={safeId(this.props.name)} {...this.props} />
            </div>
        );
    }
}

class Pre extends React.Component {
    select(e) {
        if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(e.target);
            range.select();
        } else if (window.getSelection) {
            let range = document.createRange();
            range.selectNode(e.target);
            window.getSelection().addRange(range);
        }
    }

    render() {
        return (
            <pre onClick={this.select} onTouchEnd={this.select}>{this.props.children}</pre>
        );
    }
}
