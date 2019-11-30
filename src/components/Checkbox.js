import React, { Component } from 'react';
import classNames from 'classnames';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let classes = classNames({
            'checkbox': true,
            'checkbox--checked': this.props.checked
        });
        return (
            <div className={classes} onClick={this.props.onClick}>
                <span className="checkbox__circle"></span>
                <span className="checkbox__label">
                    {this.props.label}
                </span>
            </div>
        );
    }
}

export default Checkbox;