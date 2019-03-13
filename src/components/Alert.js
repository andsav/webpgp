import React from 'react';

export class Alert extends React.Component {
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

export class Error extends React.Component {
    render() {
        return (
            <Alert type="danger">
                {this.props.message}
            </Alert>
        );
    }
}
