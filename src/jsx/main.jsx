ReactDOM.render(
    <Page pages={pages} />,
    document.getElementById("wrap"));

window.onpopstate = () => {
    window.changePage(
        window.location.hash === ""
            ? DEFAULT_PAGE
            : window.location.hash.substr(1)
    );
};
