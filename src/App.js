import { Component } from "react";
import "./App.css";
import Navigation from "./component/Naviagation/Navigation";
import Logo from "./component/Logo/Logo";
import Rank from "./component/Rank/Rank";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }
  onInputChange = (e) => {
    console.log(e.target.value);
  };

  onButtonSubmit = () => {
    console.log("click is working");
  };
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/* 
        <FaceRecogniion /> */}
      </div>
    );
  }
}

export default App;
