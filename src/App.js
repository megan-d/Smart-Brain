import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';




const particlesOptions = {
      particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }
    
const initialState = {
  
    input: '',
    imageUrl: '',
    box: {},
    //route keeps track of where we are on the page
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }


class App extends Component {
  //create state by defining constructor so app knows what the value is that user enters, remembers it, and updates it any time it's changed
  constructor() {
    super();
    this.state = initialState;
  }

  //load user function
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }})
    }


  //create function to make bounding box on face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //select inputimage id
    const image = document.getElementById('inputimage');
    //give width and height to work with bounding box percentage numbers
    const width = Number(image.width);
    const height = Number(image.height);
    //return object that fills up the box state
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //create another method on this class to change the state of the box state
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // what to do when the input changes
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  //what to do when the detect button is clicked
  onButtonSubmit = () => {
    //set state of imageUrl to whatever is in input
    this.setState({imageUrl: this.state.input});
      //copy endpoint Heroku gave us and leave ending of imageurl
      fetch('https://nameless-peak-68055.herokuapp.com/imageurl', {
          method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
          })
      .then(response => response.json())
      //take the returned object from calculateFaceLocation and put it into displayFaceBox
      .then(response => {
        if(response) {
          fetch('https://nameless-peak-68055.herokuapp.com:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          //user object.assign since only want to change user object
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log);
      
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    //if route is signout, set state of isSignedIn to false. else if it's home, set isSignedIn to true.
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    //pass route so that can pass different parameters for different pages
    this.setState({route: route});
  }

  render() {
    //you could destructure to make it clearner with not always having to say this.state. I left it as is for now to get used to syntax.
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} 
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* if this.state.route is home, show the home page. otherwise, show the rest. must wrap rest in div because JSX. */}
        { this.state.route === 'home' ?
            <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>

            <ImageLinkForm 
            /* need to use this.onInputChange because onInputChange is a property of the app */
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            /> 
            {/* pass current state of imageUrl and box as props */}
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            //otherwise, if this.state.route is signing, display signin.
          : (
              this.state.route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              //otherwise, return register page.
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
          
        }
      </div>
    );
  }
}

export default App;