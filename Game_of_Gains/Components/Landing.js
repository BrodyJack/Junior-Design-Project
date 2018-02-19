import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
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

        wwidth = Dimensions.get('window').width;

        return (
            <View style={styles.page}>
                <Image style={{width: wwidth - 100, height: wwidth - 100, marginBottom: 50 }} source={require('./../img/template_icon.png')}/>
                <Button
                    title="Sign In"
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    textStyle={{ fontWeight: "700" }}
                    onPress={() => this.props.navigation.navigate('SignIn')}
                    buttonStyle={{
                        backgroundColor: "rgba(35, 192, 144, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginBottom: 20,
                    }}
                    />
                <Button
                    title="Sign Up"
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    textStyle={{ fontWeight: "700" }}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    buttonStyle={{
                        backgroundColor: "rgba(35, 192, 144, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
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
        backgroundColor: 'rgba(47, 76, 112, 1)'
    }
});

module.exports = LandingScreen;