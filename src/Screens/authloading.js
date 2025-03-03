import React from "react";
import { TextInput, View, Button, Text, Alert, TouchableOpacity,
     ImageBackground, Image, ActivityIndicator, StyleSheet, AsyncStorage, NetInfo  } from "react-native";
// import { styles } from "../Styles/styles";
import { base64 } from "base-64";
import { SplashScreen } from "expo";
import  Loader  from "../components/loader";
import { connect } from "react-redux";
import { saveUser } from "../actions/User";


class AuthLoading extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            IPAddress: '',
            DBKey: '',
            data: null,
            isLoaded: false,
            requestFailed: false,
            loading: false
        }

        this.checkLoggedIn = this.checkLoggedIn.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    render(){
        return(
            <View>
            <Loader loading={this.state.loading} />
            </View>
        );
    }
    
    
    componentDidMount = async() =>{
        // this.props.navigation.navigate('App')
        this.setState({loading: true})
        let credentialPromise =  this.getCredentials();
        // let apiPromise = this.getAPIDetails();
        await credentialPromise
        // await apiPromise
        await this.checkLoggedIn()
    }

    getCredentials = async() => {
        try {
            this.setState({
                username: await AsyncStorage.getItem('username'),
                password: await  AsyncStorage.getItem('password'),               
            })
        } catch (error) {
            console.error(error)
        }
    }

    // getAPIDetails = async() => {
    //          try {
    //         this.setState({
    //             IPAddress: await  AsyncStorage.getItem('ipaddress'),
    //             DBKey: await AsyncStorage.getItem('dbkey')                
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    checkLoggedIn = async() => {


        if(this.state.username == null || this.state.password == null) {

            console.log('Not Logged In: ' + this.state.username)
            this.setState({loading: false})
            this.props.navigation.navigate('Auth')

        } else {

            const response = await this.fetchdata();

            if(response != null && this.state.isLoaded && !this.state.requestFailed){

                this.props.saveUser(response);
                console.log('Logged In')
                this.setState({loading: false})
                this.props.navigation.navigate('App')

            } else {

                console.log('Not Logegd In')
                this.setState({loading: false})
                this.props.navigation.navigate('Auth')

            }
        }

        // this.props.navigation.navigate('Auth')

    }

    //   _saveUser = async (user) => {
    //     try {
    //         await AsyncStorage.setItem('username', this.state.username)
    //         await AsyncStorage.setItem('password', this.state.password)
    //     } catch (error) {
    //         // Error saving data
    //         console.error(error)
    //     }
    //     };

      async fetchdata () {
        // const url = 'http://192.168.1.26:8919/TSBE/User/FSigninMobileApp';

        //   //Only for debugging. Removes need of entering user and pass 
        //   user = 'superuser'
        //   pass = 'techSupport20177'
        console.log('start fetching')

        const url = 'http://' + this.props.config.IPAddress + '/TSBE/User/FSigninMobileApp';
        var base64 = require("base-64");
        let base64String = 'Basic ' + base64.encode(this.state.username+":"+this.state.password);

        this.setState({requestFailed: false})
        let result = await fetch(url, {method: "POST", 
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Authorization": base64String,
                "app": "6289",
                "ts": this.props.config.DBKey,
        },
        body: JSON.stringify({
            "Browser": "Native_Platform",
            "IsMobile": "true",
            "SessionId": "iOS SDK built for x86",
            "DataEntryStatus": "1",
         })
        }).then((response) => {

            if(!response.ok) throw new Error(response.status);
            else{
                if(response._bodyText != "")
                    return response.json();
                else   
                    return null;
            }

        }).then((data) => {

            if(data != null)
            {
                this.setState({data: data, isLoaded: true});
                return data;
            }
            else 
            {
                return null
            }

        }).catch((error)=>{

            console.log('error: ' + error);
            this.setState({requestFailed: true})
            return error

        });
        
        console.log('end fetching')

        return result;
    }  


}


const mapStateToProps = state => {
    return {
      config: state.APIConfigInfo
    }
  }

  const mapDispatchToProps = dispatch => ({
    saveUser: (user) => dispatch(saveUser(user)),
});

  export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)