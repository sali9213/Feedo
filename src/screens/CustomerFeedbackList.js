import React from 'react'
import { View, TextInput, Text, TouchableOpacity, AsyncStorage } from "react-native";
// import { SignInScreen } from "./SignIn";
import { stylesheet } from "../Styles/stylesheet";
import { SplashScreen } from "expo";
import { connect } from "react-redux";


class CustomerFeedbackListScreen extends React.Component{

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
        console.log('Start Initialisation')
        await this._init()
        console.log('End Initialisation')
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
            <Text>EmployeeName: { this.props.user.EmployeeName }</Text>
            <TouchableOpacity onPress={() => navigate('Auth', {})}>
                <View style = {stylesheet.buttonContainer}>
                    <Text style = {{color: 'white'}}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View> 
        );
    }

}


const mapStateToProps = state => {
    return {
      user: state.userInfo.user
    }
  }
  
  
  export default connect(mapStateToProps, null)(CustomerFeedbackListScreen)