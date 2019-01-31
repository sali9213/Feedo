import React from "react";
import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export const styles = StyleSheet.create({
    textbox: {
        height: 50, 
        margin: 10, 
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
        margin: 10
      },
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    settingContainer: {
        backgroundColor: 'transparent', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50,
        width: 50,
        margin: 10
      }
});


















