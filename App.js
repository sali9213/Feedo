import  React  from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Text, AppRegistry } from "react-native";
import  AppContainer  from "./src/Routes.js";
import { SplashScreen } from "expo";
import { Provider } from "react-redux";
import configureStore from "./Store";
import { name as appName} from "./app.json"


const store = configureStore()


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
          <AppContainer />
        </Provider>
      );
  }

}

// AppRegistry.registerComponent(appName, () => App)