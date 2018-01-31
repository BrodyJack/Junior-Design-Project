import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCVqL1WyvpMckhWxVauDbTvnB6pus-L4OY",
    authDomain: "game-of-gains.firebaseapp.com",
    databaseURL: "https://game-of-gains.firebaseio.com",
    storageBucket: "game-of-gains.appspot.com"
});

class LandingScreen extends React.Component {

    static navigationOptions = {header: null};
    
    render() {
        return (
            <View style={styles.page}>
                <Image source={require('./../img/dab.jpg')}/>
                <Button
                    onPress={() => this.props.navigation.navigate('SignIn')}
                    title="Sign In"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    title="Sign Up"
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