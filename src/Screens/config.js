import React from 'react'
import { View, TextInput, TouchableOpacity, Text,
     AsyncStorage, StyleSheet, Modal, TouchableHighlight } from "react-native";
import { stylesheet } from "../Styles/stylesheet";
import { SplashScreen } from 'expo';


export default class ConfigScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            IPAddress: '',
            DBKey: '',
            modalVisible: false
        }
        console.log('constructed')

    }

    componentDidMount(){
        this._retrieveData();

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    static navigationOptions = {
        title : 'Config',
    };

    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <View style={{width: '90%'}}>
                    <Text style={{paddingLeft: 10}}>IP Address:</Text>
                    <TextInput placeholder='IP Address' name='IPAddress' style={styles.textbox}  value={this.state.IPAddress} onChangeText={(val) => this.setState({IPAddress: val})}></TextInput>
                    <Text style={{paddingLeft: 10}}>DBKey:</Text>
                    <TextInput placeholder='Database Key' name='DBKey' style={stylesheet.textbox}  value={this.state.DBKey} onChangeText={(val) => this.setState({DBKey: val})}></TextInput>
                    <TouchableOpacity onPress={() =>  this._storeData(this.state.IPAddress, this.state.DBKey)} >
                            <View style = {stylesheet.buttonContainer}>
                                <Text style = {{color: 'white'}}>SAVE</Text>
                            </View>
                    </TouchableOpacity>
                </View> 


            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.DialogWrapper}>

                    </View>
                </View>

      <TouchableHighlight
                onPress={() => {
                this.setModalVisible(false);
                }}>
                <Text>hide Modal</Text>
            </TouchableHighlight>
         
            </Modal>

            <TouchableHighlight
                onPress={() => {
                this.setModalVisible(true);
                }}>
                <Text>Show Modal</Text>
            </TouchableHighlight>

            
            </View>
         
        );
    }

    _storeData = async (ipaddress, dbkey) => {
        try {
        if(ipaddress == null) ipaddress = '';
        if(dbkey == null) dbkey = '';
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



const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    DialogWrapper: {
      backgroundColor: '#FFFFFF',
      height: 150,
      width: 300,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    textbox: {
        height: 50, 
        padding: 10,
    }
  });