import React from "react";
import { TextInput, View, Button, Text, TouchableOpacity,
     ImageBackground, Image, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
// import { styles } from "../Styles/styles";
import { base64 } from "base-64";
import { SplashScreen } from "expo";
import  Loader  from "../components/loader";
import { connect } from "react-redux";
import { saveUser } from "../actions/User";
import { saveAPIConfig } from "../actions/APIConfig"


class SignInScreen extends React.PureComponent{
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            data: null,
            isLoaded: false,
            loading: false,
            requestFailed: false,
        }

        this.IPAddress = ''
        this.DBKey = ''

        this.renderCount = 0

        this._retrieveAPIDetails = this._retrieveAPIDetails.bind(this)
        this.fetchdata = this.fetchdata.bind(this)
        this.render = this.render.bind(this)
        
    }

    static navigationOptions = {
        title: 'Sign In',
        header: null
    };

    _retrieveAPIDetails = async () => {
        try {
            this.IPAddress = await AsyncStorage.getItem('ipaddress')
            this.DBKey = await AsyncStorage.getItem('dbkey')
        // this.setState({
        //     IPAddress: await AsyncStorage.getItem('ipaddress'),
        //     DBKey: await AsyncStorage.getItem('dbkey')
        // })
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      };

    // _saveUser = async (user) => {
        // this.props.save(user)
    // };

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillUnmount(){
        this.setState({loading: false})
    }

    render(){
        const {navigate} = this.props.navigation;
        this.renderCount = this.renderCount + 1
        return(
            <ImageBackground source={require('../../assets/loginbackground.jpg')} style={{width: '100%', height: '100%'}} >
             { this.state.loading && (<Loader loading={this.state.loading} />) }

                <View style={{flexDirection: "row", justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => navigate('Config', {})} style={{marginTop: 30, marginRight: 10}}>
                            <Image source={require('../../assets/gear.png')} style={{resizeMode: 'contain', width: 50, height: 50}}/>
                    </TouchableOpacity>
                </View>

             <View style={{flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', flex: 1}}>
                
                <View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                        <Image source={require('../../assets/logo.png')} style={{resizeMode: 'contain', width: '50%', height: '100%', paddingTop: 130}}/>
                </View>
                
                <View style={{width: '80%', flex: 3, justifyContent: 'center'}}>
                        <TextInput placeholder='USERNAME' autoCapitalize='none' placeholderTextColor='#93A0A7' name='username' style={styles.textbox} onChangeText={this.handleUsername}></TextInput>
                        <TextInput placeholder='PASSWORD' autoCapitalize='none' placeholderTextColor='#93A0A7' name='password' secureTextEntry style={styles.textbox} onChangeText={this.handlePassword}></TextInput>
                        <TouchableOpacity onPress={() => this.handleClick(this.state.username, this.state.password)} ref='touch'>
                            <View style = {styles.buttonContainer}>
                                <Text style = {{color: 'white'}}>LOGIN</Text>
                            </View>
                        </TouchableOpacity>
              
                </View>

                <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                    <Image source={require('../../assets/technosyslogo.png')} style={{resizeMode: 'contain', width: '20%'}}/>
                </View>

             </View>
            </ImageBackground>

            );
    }

    handleUsername = (text) => {
        this.setState({
            username: text
        })
    }

    handlePassword = (text) => {
        this.setState({
            password: text
        })
    }
  

    async handleClick (user, pass) {

        await this._retrieveAPIDetails()

        console.log(this.props.IPAddress + ' ' + this.props.DBKey)
        this.setState({loading: true})
        const result = await this.fetchdata(user, pass);
        this.setState({loading: false})
        this.forceUpdate()

        if(result != null && this.state.isLoaded && !this.state.requestFailed){
        this.props.saveUser(result) //saving to redux store

        this.props.navigation.navigate('App')
            

        } else if(!this.state.requestFailed && result == null && !this.state.isLoaded){
            setTimeout(() => {
                alert('Username or Password is incorrect');
              }, 600);

        } else if (this.state.requestFailed){
            
            setTimeout(() => {
                alert(result);
              }, 600);

        }

    }

    async fetchdata (user, pass) {
        // const url = 'http://192.168.1.26:8919/TSBE/User/FSigninMobileApp';

          //Only for debugging. Removes need of entering user and pass 
          user = 'superuser'
          pass = 'techSupport20177'


        const url = 'http://' + this.IPAddress + '/TSBE/User/FSigninMobileApp';
        var base64 = require("base-64");
        let base64String = 'Basic ' + base64.encode(user+":"+pass);

        this.setState({requestFailed: false})
        let result = await fetch(url, {method: "POST", 
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Authorization": base64String,
                "app": "6289",
                "ts": this.DBKey,
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

            console.error(error);
            this.setState({requestFailed: true})
            return error

        });
        
        return result;
    }  

}  

const styles = StyleSheet.create({
    textbox: {
        height: 50, 
        marginVertical: 10, 
        borderColor:'black',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#E0F4FF'

    },
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
      buttonContainer: {
        backgroundColor: 'orange', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50,
        marginVertical: 10
      },
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
      }
    // settingContainer: {
    //     backgroundColor: 'transparent', 
    //     alignItems: 'center', 
    //     justifyContent: 'center', 
    //     height: 50,
    //     width: 50,
    //     margin: 10
    //   }
});

const mapStateToProps = state => {
    return {
      IPAddress: state.APIConfigInfo.IPAddress,
      DBKEy: state.APIConfigInfo.DBKEy
    }
  }
  
  const mapDispatchToProps = dispatch => ({
        saveUser: (user) => dispatch(saveUser(user)),
        saveAPIConfig: (IPAddress, DBKey) => dispatch(saveAPIConfig(IPAddress, DBKey))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)