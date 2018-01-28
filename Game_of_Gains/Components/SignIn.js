import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class LandingScreen extends React.Component {

    async login(email, pass) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");
            this.props.navigation.navigate('MainNav');
        } catch (error) {
            console.log(error.toString());
        }
    }
    
    render() {
        return (
            <View style={styles.page}>
                <Button
                    onPress={() => this.login('brodyjackj@gmail.com', '123456')}
                    title="Sign In (Test)"
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