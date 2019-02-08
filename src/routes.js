import React  from "react";
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import SignInScreen from './Screens/signin';
import CustomerFeedbackScreen from './Screens/CustomerFeedbackList';
import ConfigScreen from "./screens/config";
import AuthLoading from "./screens/authloading"



// export const appNavigator = createStackNavigator({
//     SignOut: {screen: SignOutScreen},
//     SignIn: {screen: SignInScreen}
// },
// {
//     initialRouteName: 'SignIn'
// });

// export default appNavigator;

export const AuthStack = createStackNavigator({
    SignIn: {screen: SignInScreen},
    Config: {screen: ConfigScreen}
},{initialRouteName: 'SignIn'})

export const AppStack = createStackNavigator({
    CustomerFeedback: {screen: CustomerFeedbackScreen}
},{initialRouteName: 'CustomerFeedback'})

export const appContainer = createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        AuthLoading: AuthLoading

    },
    {
        initialRouteName: 'AuthLoading',
    }
))

export default appContainer;
//Auth-loading: first route to check if user has already signed in or not

//Auth: if user has not been signed in and needs to sign in. This is the sign in screen/sign up/forgot password

//App: if user us already signed in. This is the normal app