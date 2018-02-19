import React from 'react';
import { AsyncStorage, View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userPass: "",
            userName: ""
        }
    }

    static navigationOptions = {header: null};

    resetToHome = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Root'})
        ]
    })

    async signup(email, pass, username) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
            console.log("Account created");
            userInfo = firebase.auth().currentUser;
            uid = userInfo.uid;
            firebase.database().ref('users/' + uid + '/').set({
                createdEvents: ['null'],
                displayName: userInfo.displayName == null ? username : userInfo.displayName,
                email: userInfo.email,
                exerciseInfo: {
                    exercises: {
                        crunch: {
                            pointsAllTime: 100,
                            pointsPer: '1/5',
                            pointsToday: 10,
                            pointsWeek: 20
                        }
                    },
                    favoriteExercises: ['crunch', 'pullup'],
                    pointsAllTime: 1000,
                    pointsToday: 10,
                    pointsWeek: 100,
                    savedRoutines: ['Monday', 'Abs Day']
                },
                friends: {
                    [uid]: {
                        added: Date.now().toString(),
                        displayName: userInfo.displayName == null ? username : userInfo.displayName,
                    }
                },
                joinedChallenges: ['null'],
                joinedEvents: ['null']
            });
            global.username = username;
            this.props.navigation.dispatch(this.resetToHome);
        } catch (error) {
            console.log(error.toString());
        }
    }
    render() {
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
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'white', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20}}
                    onChangeText={(text) => this.setState({userPass: text})}
                />
                <TextInput
                    placeholder="Display Name"
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'white', width: wwidth - 80, height: 35, backgroundColor: 'white'}}
                    onChangeText={(text) => this.setState({userName: text})}
                />
                <Button
                    title="Sign Up"
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    textStyle={{ fontWeight: "700" }}
                    onPress={() => this.signup(this.state.userEmail, this.state.userPass, this.state.userName)}
                    buttonStyle={{
                        backgroundColor: "rgba(35, 192, 144, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 40
                    }}
                />
            </KeyboardAvoidingView>
            
            /*<TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={{borderWidth: 1, borderRadius: 5, borderColor: 'white', width: wwidth - 80, height: 35, backgroundColor: 'white'}}
            onChangeText={(text) => this.setState({userPass: text})}
            />
            */
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

module.exports = SignUpScreen;
