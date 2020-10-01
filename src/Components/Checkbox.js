import React from 'react';
class Checkbox extends React.Component {
        static defaultProps = {
            checked: false
        }
        render() {
            return (
                <input
                    type={this.props.type}
                    name={this.props.name}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
            );
        }
    }

export default Checkbox;