import React from 'react'
import { View, TextInput, TouchableOpacity, Text,
     AsyncStorage, StyleSheet, Modal, TouchableHighlight} from "react-native";
import { stylesheet } from "../Styles/stylesheet";
import { SplashScreen } from 'expo';
import Dialog from 'react-native-dialog';
import { TextField } from "react-native-material-textfield";

export default class ConfigScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            IPAddress: '',  
            DBKey: '',
            tempIPAddress: '',
            tempDBKey: '',
            showIPDialog: false,
            showDBDialog: false
        }
    }

    componentDidMount = async() =>{
        await this._retrieveData();
    }


    saveIPData() {
        this.setState({
            IPAddress: this.state.tempIPAddress,
            showIPDialog: false
        }, function() {

            this._storeData(this.state.IPAddress, this.state.DBKey)

        })
    }

    saveDBData() {
        this.setState({
            DBKey: this.state.tempDBKey,
            showDBDialog: false
        }, function() {

            this._storeData(this.state.IPAddress, this.state.DBKey)

        })
    }

   editIP(visible) {
        this.setState({
            showIPDialog: visible,
            tempIPAddress: this.state.IPAddress
         });
      }

    editDB(visible) {
        this.setState({
            showDBDialog: visible,
            tempDBKey: this.state.DBKey
            });
    }

    static navigationOptions = {
        title : 'Config',
    };

    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <View style={{width: '90%'}}>

                    <TouchableOpacity onPress={() => this.editIP(true)} >
                        <View pointerEvents="none">
                    <TextField label="Web API URL" editable={false} value={this.state.IPAddress} ></TextField>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.editDB(true)} >
                        <View pointerEvents="none">     
                            <TextField label="Databse Key" editable={false} value={this.state.DBKey}></TextField>
                        </View>
                    </TouchableOpacity>

                </View> 

                <View>
                    <Dialog.Container visible={this.state.showIPDialog}>
                        <Dialog.Title children=''>IP Address</Dialog.Title>
                        {/* <TextInput value={this.state.currentValue} style={{borderColor: 'black', borderWidth: 1, borderRadius: 5, height: 40, marginHorizontal: 10, paddingHorizontal: 5, marginBottom: 5 }}></TextInput> */}
                        <Dialog.Input value={this.state.tempIPAddress} onChangeText={(val) => this.setState({tempIPAddress: val})}></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={() => this.setState({showIPDialog: false})} />
                        <Dialog.Button label="OK" onPress={() => this.saveIPData()} />
                    </Dialog.Container>
                </View>

                 <View>
                    <Dialog.Container visible={this.state.showDBDialog}>
                        <Dialog.Title children=''>Data Base Key</Dialog.Title>
                        {/* <TextInput value={this.state.currentValue} style={{borderColor: 'black', borderWidth: 1, borderRadius: 5, height: 40, marginHorizontal: 10, paddingHorizontal: 5, marginBottom: 5 }}></TextInput> */}
                        <Dialog.Input value={this.state.tempDBKey} onChangeText={(val) => this.setState({tempDBKey: val})}></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={() => this.setState({showDBDialog: false})} />
                        <Dialog.Button label="OK" onPress={() => this.saveDBData()} />
                    </Dialog.Container>
                </View>
            
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