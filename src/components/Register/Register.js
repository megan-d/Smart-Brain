import React from 'react';

//pure function with no state
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        //set state to whatever is in input field for email
        this.setState({name: event.target.value})
    }
    
    onEmailChange = (event) => {
        //set state to whatever is in input field for email
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        //set state to whatever is in input field for password
        this.setState({password: event.target.value})
    }

    //create Register event to use state to fetch
    onSubmitSignIn = () => {
        //send login information to server with fetch. by default it's a get request but we want to do post in this case.
        fetch('https://nameless-peak-68055.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        return (
            //display sign in form using tachyons
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                {/* change form to div so doesn't try to send form since have a type submit below */}
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChange}
                                    />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange= {this.onPasswordChange}
                                    />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            //do an arrow function so onRouteChange with parameter only runs when clicked
                            onClick={ this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;