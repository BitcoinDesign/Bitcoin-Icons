import IconOutline from './IconOutline';
import IconFilled from './IconFilled';
import {Component} from 'react';

class IconComponent extends Component {
    components = {
        IconOutline,
        IconFilled
    };

    render() {
        const ComponentName = this.props.version === 'outline' ? this.components['IconOutline'] : this.components['IconFilled'];
        return <ComponentName tag={ this.props.tag } style={ this.props.style } />
    }
}

export default IconComponent;
