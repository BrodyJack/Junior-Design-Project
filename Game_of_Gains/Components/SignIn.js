import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
import './Global.js';
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
            await firebase.auth().signInWithEmailAndPassword(email, pass);
            console.log("Logged In!");
            this.props.navigation.dispatch(this.resetToHome);
        } catch (error) {
            console.log(error.toString());
        }
    }

    render() {

        wwidth = Dimensions.get('window').width;

        return (
            <KeyboardAvoidingView style={styles.page} behavior="padding">
                <Image style={{width: wwidth - 100, height: wwidth - 100, marginBottom: 50 }} source={require('./../img/template_icon.png')}/>
                    <TextInput
                        placeholder="Email"
                        style={{borderWidth: 1, borderRadius: 5, borderColor: 'white', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20}}
                        onChangeText={(text) => this.setState({userEmail: text})}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={{borderWidth: 1, borderRadius: 5, borderColor: 'white', width: wwidth - 80, height: 35, backgroundColor: 'white'}}
                        onChangeText={(text) => this.setState({userPass: text})}
                    />
                <Button
                    title="Sign In"
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    textStyle={{ fontWeight: "700" }}
                    onPress={() => this.login(this.state.userEmail, this.state.userPass)}                    buttonStyle={{
                        backgroundColor: "rgba(35, 192, 144, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 40
                    }}
                    />
                <View style={{flex: 1, flexDirection: 'row', marginTop: 150}}>
                    <Button
                        title="Brody"
                        textStyle={{ fontSize: 10 }}
                        onPress={() => this.login('brodyjackj@gmail.com', '123456')}
                    />
                    <Button
                        title="Brandon"
                        textStyle={{ fontSize: 10 }}
                        onPress={() => this.login('brandon@gmail.com', '123456')}
                    />
                    <Button
                        title="Jessica"
                        textStyle={{ fontSize: 10 }}
                        onPress={() => this.login('', '')}
                    />
                    <Button
                        title="Will"
                        textStyle={{ fontSize: 10 }}
                        onPress={() => this.login('', '')}
                    />
                    <Button
                        title="Grayson"
                        textStyle={{ fontSize: 10 }}
                        onPress={() => this.login('', '')}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(47, 76, 112, 1)'
    },
});

module.exports = SignInScreen;
