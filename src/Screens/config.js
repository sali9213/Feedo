import React from 'react'
import { View, TextInput, TouchableOpacity, Text, AsyncStorage, getAttributem, ImageBackground } from "react-native";
import { styles } from "../Styles/styles";
import { SplashScreen } from 'expo';


export default class ConfigScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            IPAddress: '',
            DBKey: ''
        }
        console.log('constructed')

    }

    componentDidMount(){
        this._retrieveData();
        console.log(this.state.IPAddress + ' ' + this.state.DBKey)
        console.log('Loaded')

    }

    static navigationOptions = {
        title : 'Config',
    };

    render(){
        return(
            <ImageBackground source={require('../../assets/loginbackground.jpg')} style={{width: '100%', height: '100%'}} >
                <View>
                    <Text style={{paddingLeft: 10}}>IP Address:</Text>
                    <TextInput placeholder='IP Address' name='IPAddress' style={styles.textbox} onChangeText={(val) => this.setState({IPAddress: val})} value={this.state.IPAddress}></TextInput>
                    <Text style={{paddingLeft: 10}}>DBKey:</Text>
                    <TextInput placeholder='Database Key' name='DBKey' style={styles.textbox} onChangeText={(val) => this.setState({DBKey: val})} value={this.state.DBKey}></TextInput>
                    <TouchableOpacity onPress={() =>  this._storeData(this.state.IPAddress, this.state.DBKey)} >
                            <View style = {styles.buttonContainer}>
                                <Text style = {{color: 'white'}}>SAVE</Text>
                            </View>
                    </TouchableOpacity>
                </View> 
            </ImageBackground>
        );
    }

    _storeData = async (ipaddress, dbkey) => {
        try {
          await AsyncStorage.setItem('ipaddress', ipaddress);
          await AsyncStorage.setItem('dbkey', dbkey)
        } catch (error) {
          // Error saving data
          console.error(error)
        }
      };

      _retrieveData = async () => {
        try {
        this.setState({
            IPAddress: await AsyncStorage.getItem('ipaddress'),
            DBKey: await AsyncStorage.getItem('dbkey')
        })
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      };
}