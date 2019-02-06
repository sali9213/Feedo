import React from "react";
import { TextInput, View, Button, Text, Alert, TouchableOpacity,
     ImageBackground, Image, ActivityIndicator, StyleSheet, AsyncStorage  } from "react-native";
// import { styles } from "../Styles/styles";
import { base64 } from "base-64";
import { SplashScreen } from "expo";
import  Loader  from "../components/loader";


export default class AuthLoading extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    
    
    componentDidMount = async() =>{
        await this._init()
        console.log(this.state.username + ' ' + this.state.password )
    }

    _init = async() => {

        try {
            this.setState({
                username: await AsyncStorage.getItem('username'),
                password: await AsyncStorage.getItem('password')                
            })
        } catch (error) {
            console.error(error)
        }

    }


}