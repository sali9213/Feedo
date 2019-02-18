import React from 'react'
import { View, TextInput, Text, TouchableOpacity, AsyncStorage,
        FlatList } from "react-native";
// import { SignInScreen } from "./SignIn";
import { stylesheet } from "../Styles/stylesheet";
import { SplashScreen } from "expo";
import { connect } from "react-redux";
import { getCustomerFeedbackData } from '../helpers/RequestAPI';


class CustomerFeedbackListScreen extends React.Component{

    static navigationOptions = {
        title : 'Logged In',
    };

    constructor(props){
        super(props)

        this.state = {
            user: '',
            data: null
        }
    }

     componentDidMount = async() =>{
        await this.getCustomerFeedbackData()
        SplashScreen.hide();
    }

    getCustomerFeedbackData = async() => {
        const url = 'http://' + this.props.IPAddress + '/TSBE/Feedback/GetCustomerFeedbackData/';
        let response = await getCustomerFeedbackData(url, this.props.user.UserId, this.props.user.GUID)
        this.setState({data: response}) 
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
            <TouchableOpacity onPress={() => navigate('Auth', {})}>
                <View style = {stylesheet.buttonContainer}>
                    <Text style = {{color: 'white'}}>Logout</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={this.state.data}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View>
                    <Text>{item.Question + ' ' + item.AcceptanceByName}</Text>
                </View>
                }
                keyExtractor={item => String(item.CustomerFeedbackId)}/>
        </View> 
        );
    }

}


const mapStateToProps = state => {
    return {
      user: state.userInfo.user,
      IPAddress: state.APIConfigInfo.IPAddress,
      DBKey: state.APIConfigInfo.DBKey
    }
  }
  
  
  export default connect(mapStateToProps, null)(CustomerFeedbackListScreen)