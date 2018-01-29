import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userPass: ""
        }
    }

    static navigationOptions = {header: null};

    resetToHome = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Root'})
        ]
    })

    async login(email, pass) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");
            this.props.navigation.dispatch(this.resetToHome);
        } catch (error) {
            console.log(error.toString());
        }
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.page} behavior="padding">
                <Image source={require('./../img/dab.jpg')}/>
                <Text>Email</Text>
                <TextInput
                    placeholder="you@gatech.edu" 
                    style={{borderBottomWidth: 1, width: 350, margin: 10}}
                    onChangeText={(text) => this.setState({userEmail: text})}
                />
                <Text>Password</Text>
                <TextInput 
                    placeholder="password" 
                    secureTextEntry={true} 
                    style={{borderBottomWidth: 1, width: 350, margin: 10, marginBottom: 50}}
                    onChangeText={(text) => this.setState({userPass: text})}
                />
                <Button
                    onPress={() => this.login(this.state.userEmail, this.state.userPass)}
                    title="Sign In"
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

module.exports = SignInScreen;