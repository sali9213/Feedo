import  React  from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Text } from "react-native";
import  AppContainer  from "./src/routes.js";
import { SplashScreen } from "expo";


export default class App extends React.Component{

  constructor(props){
    super(props);
    SplashScreen.preventAutoHide();
  }
  
  static navigationOptions = {
    title: 'Log In'
  };

  render(){
      return(
        <AppContainer /> //Will need to add auth loadign navigator
      );
  }

}