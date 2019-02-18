import  React  from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Text, AppRegistry } from "react-native";
import  AppContainer  from "./src/Routes.js";
import { SplashScreen } from "expo";
import { Provider } from "react-redux";
import {store, persistor} from "./Store";
import { name as appName} from "./app.json";
import { PersistGate } from 'redux-persist/lib/integration/react';


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
        <Provider store = { store }>
        <PersistGate persistor={persistor}>
          <AppContainer />
          </PersistGate>
        </Provider>
      );
  }

}

// AppRegistry.registerComponent(appName, () => App)