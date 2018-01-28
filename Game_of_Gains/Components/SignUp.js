import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class LandingScreen extends React.Component {

    async signup(email, pass) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
            console.log("Account created");
            this.props.navigation.navigate('MainNav');
        } catch (error) {
            console.log(error.toString());
        }
    }
    
    render() {
        return (
            <View style={styles.page}>
                <Button
                    onPress={() => this.signup("brodyjackj@gmail.com", "123456")}
                    title="Sign Up (Test)"
                />
            </View>
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

module.exports = LandingScreen;