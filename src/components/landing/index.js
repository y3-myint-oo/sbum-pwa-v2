import React, { Component } from 'react';
import LoginForm from './loginFrame';

class Landing extends Component {
    render() {
        console.log('[Data] this.props', this.props);
        return(
            <div>
                <h4>Landing Page</h4>   
                <LoginForm />
            </div>
        )
    }
}
export default Landing;
  