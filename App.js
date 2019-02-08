import  React  from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Text } from "react-native";
import  AppContainer  from "./src/routes.js";
import { SplashScreen } from "expo";


export default class App extends React.Component{

  constructor(props){
    super(props);
    SplashScreen.preventAutoHide();
    this.state = {
      user: null
    }
  }
  
  static navigationOptions = {
    title: 'Log In'
  };

  render(){
      return(
        <AppContainer />
      );
  }

}