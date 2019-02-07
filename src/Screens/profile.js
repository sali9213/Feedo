import React from 'react'
import { View, TextInput, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { SignInScreen } from "./signin";
import { stylesheet } from "../Styles/stylesheet";
import { SplashScreen } from "expo";


export default class ProfileScreen extends React.Component{

    static navigationOptions = {
        title : 'Logged In',
    };

    constructor(props){
        super(props)

        this.state = {
            user: ''
        }
    }

     componentDidMount = async() =>{
        SplashScreen.hide()
        await this._init()
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Text>EmployeeName: { this.state.user.EmployeeName }</Text>
                <TouchableOpacity onPress={() => navigate('Auth', {})}>
                    <View style = {stylesheet.buttonContainer}>
                        <Text style = {{color: 'white'}}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View> 
        );
    }


    _init = async () => {
        try {
        this.setState({
            user: JSON.parse(await AsyncStorage.getItem('user'))
        }) 
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      };
}