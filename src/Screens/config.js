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
            showDialog: false,
            currentEditTitle: '',
            currentEditName: '',
            currentEditValue: '',
            showIPDialog: false,
            showDBDialog: false
        }
    }

    componentDidMount(){
        this._retrieveData();

    
    }

    
   showDialog(visible, curredit, currvalue) {
    this.setState({
        showDialog: visible,
        currentEditName: curredit,
        currentEditValue: currvalue
     });
  }

   saveData(curredit, currvalue) {
        this.setState({
            [curredit]: currvalue
        })
        
        this.showDialog(false, '', '')
    }

   editIP(visible, curredit) {
        this.setState({
            showDialog: visible,
            currentEditTitle: 'Web API URL',
            currentEditName: curredit,
            currentEditValue: this.state[curredit]
         });
      }

    editDB(visible, curredit) {
        this.setState({
            showDialog: visible,
            currentEditTitle: 'Data Base Key',
            currentEditName: curredit
            });
    }

    static navigationOptions = {
        title : 'Config',
    };

    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <View style={{width: '90%'}}>

                    <TouchableOpacity onPress={() => this.editIP(true, 'IPAddress')} >
                        <View pointerEvents="none">
                    <TextField label="Web API URL" editable={false} value={this.state.IPAddress} ></TextField>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.editDB(true, 'DBKey')} >
                        <View pointerEvents="none">     
                            <TextField label="Databse Kay" editable={false} value={this.state.DBKey}></TextField>
                        </View>
                    </TouchableOpacity>

                </View> 

                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                        <Dialog.Title children=''>{ this.state.currentEditTitle }</Dialog.Title>
                        {/* <TextInput value={this.state.currentValue} style={{borderColor: 'black', borderWidth: 1, borderRadius: 5, height: 40, marginHorizontal: 10, paddingHorizontal: 5, marginBottom: 5 }}></TextInput> */}
                        <Dialog.Input value={this.state.currentEditValue} onChangeText={(val) => this.setState({currentEditValue: val})}></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={() => this.showDialog(false, '', '')} />
                        <Dialog.Button label="OK" onPress={() => this.saveData(this.state.currentEditName, this.state.currentEditValue)} />
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