import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { SignInScreen } from "./signin";
import { stylesheet } from "../Styles/stylesheet";


export default class ProfileScreen extends React.Component{

    static navigationOptions = {
        title : 'Logged In',
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Text>Logged In</Text>
                <TouchableOpacity onPress={() => navigate('Auth', {})}>
                    <View style = {stylesheet.buttonContainer}>
                        <Text style = {{color: 'white'}}>LOGIN</Text>
                    </View>
                </TouchableOpacity>
            </View> 
        );
    }
}