import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList, KeyboardAvoidingView, TextInput , Dimensions} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class AddExercise extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Log Exercise',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.state.params.name,
            type: this.props.navigation.state.params.type,
            reps: this.props.navigation.state.params.reps,
            weight: this.props.navigation.state.params.weight,
            currentUserId: firebase.auth().currentUser.uid
        }
    }

    async logExercise(currState) {
        console.log(currState);
        uid = firebase.auth().currentUser.uid;
        nowDate = Date.now().toString();

        var updates = {};
        updates['history/' + uid + '/alltime/' + nowDate + '/'] = currState;
        
        var repsPR = 0;
        var weightPR = 0;
        await firebase.database().ref('history/' + uid + '/alltime/').once('value', (snap) => {
            snap.forEach((child) => {
                if (child.val().name === currState.name ) {
                    if (currState.type == 'cardio' && child.val().reps > repsPR) {
                        repsPR = child.val().reps;
                    }
                    else if ((child.val().weight >= weightPR && child.val().reps > repsPR) || (child.val().weight > weightPR && child.val().reps >= repsPR)) {
                        repsPR = child.val().reps;
                        weightPR = child.val().weight;
                    }
                }
            })
        });

        //This should eventually be based on sets for lifting, time for cardio
        if (currState.reps > repsPR) {
            currState.points = currState.reps * 2;
        } else {
            currState.points = currState.reps;
        }
        
        var currPoints;
        firebase.database().ref('users/' + uid + '/exerciseInfo/pointsAllTime/').once('value', (snap) => {
            currPoints = snap.val(); 
        });
        updates['users/' + uid + '/exerciseInfo/pointsAllTime/'] = currState.points + currPoints;

        try {
            firebase.database().ref().update(updates);
            if (currState.reps > repsPR) {
                Alert.alert("New PR!", "Logged " + currState.name + " for " + currState.points + " points! You have " + (currState.points + currPoints) + " total points!" );
            } else {
                Alert.alert("Success!", "Logged " + currState.name + " for " + currState.points + " points! You have " + (currState.points + currPoints) + " total points!" );
            }
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error.toString());
        }

    }

    render() {
        wwidth = Dimensions.get('window').width;
        if (this.state.type == 'cardio') {
            return (
                <Card title={this.state.name}>
                    <Text style={styles.cardText}>Reps</Text>
                    <KeyboardAvoidingView>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.reps.toString()}
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({reps: parseInt(text)})}
                        />
                    </KeyboardAvoidingView>
                    <Button raised rounded title="Log" backgroundColor='#007aff' marginTop={25}
                        onPress={() => this.logExercise(this.state)}/>
                    <Text></Text>
                    <Button raised rounded title="Cancel" backgroundColor='#ff3b30' marginTop={75}
                        onPress={() => this.props.navigation.goBack()}/>
                </Card>
            );
        } else if (this.state.type == 'lifting') {
            return (
                <Card title={this.state.name}>
                    <Text style={styles.cardText}>Reps</Text>
                    <KeyboardAvoidingView>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.reps.toString()}
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({reps: parseInt(text)})}
                        />
                        <Text style={styles.cardText}>Weight</Text>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.weight.toString()}
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({weight: parseInt(text)})}
                        />
                    </KeyboardAvoidingView>
                    <Button raised rounded title="Log" backgroundColor='#007aff' marginTop={25} marginBottom={25}
                        onPress={() => this.logExercise(this.state)}/>
                    <Text></Text>
                    <Button raised rounded title="Cancel" backgroundColor='#ff3b30' marginTop={75}
                        onPress={() => this.props.navigation.goBack()}/>
                </Card>
            );
        }
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16
    },
    editText: {
        textAlign: 'center',
        color: 'gray'
    },
    quickPick: {

    }
});
module.exports = AddExercise;
