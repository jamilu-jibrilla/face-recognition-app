import { Component } from "react";
import "./App.css";
import Navigation from "./component/Naviagation/Navigation";
import Logo from "./component/Logo/Logo";
import Rank from "./component/Rank/Rank";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import SignIn from "./component/SignIn/SignIn";
import Register from "./component/Register/Register";




const USER_ID = 'clarifai';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '7705dff1f65f4f5a9e669d61b6172a7b';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
// Change this to whatever image URL you want to process

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl:"",
      box: "",
      route:"signIn",
      isSignedIn: false
    };
  }
  
  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
      imageUrl: e.target.value,
      box: ""
    }) 
  };

  onRouteChange = (route) => {
    if(route === "signIn") {
      this.setState({isSignedIn: false})
    } else if( route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  calculateFaceLocation =(data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  onButtonSubmit = () => {
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.imageUrl
                  }
              }
          }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
  };

  render() {
    const {isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App">
        <div style={{display: "flex", justifyContent:"space-between", marginTop: "12px"}}>
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> 
        </div>

      { this.state.route === "home" 
        ?  <div>
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageSrc={imageUrl}  box={box} /> 
          </div>
          : (
            route === "signIn" 
            ? <SignIn onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} /> 
          )
      }
      </div>
    );
  }
}

export default App;
