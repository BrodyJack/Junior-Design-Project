import React from 'react';
import {
    View, Text, Image, StyleSheet, Alert, TouchableHighlight,
    ScrollView, ListView, FlatList, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native';
import { Card, ListItem, Button, List, SearchBar } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class QuickLogScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quick Log',
        }
    }

    constructor(props) {
        super(props);
        //this.setRadio = this.setRadio.bind(this);
        this.state = {
            name: "",
            type: "",
            reps: 0,
            weight: 0,
            time: 0,
            distance: 0,
            sets: 0,
            currentUserId: firebase.auth().currentUser.uid,
            value: 0
        }
    }

    async logExercise(currState) {
        console.log(currState);
        uid = firebase.auth().currentUser.uid;
        nowDate = Date.now().toString();

        var updates = {};
        updates['history/' + uid + '/alltime/' + nowDate + '/'] = currState;

        try {
            firebase.database().ref().update(updates);
            Alert.alert("Success!", "Logged a " + currState.name);
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error.toString());
        }
    }

    render() {
        wwidth = Dimensions.get('window').width;
        let typeView = null;
        // Cardio
        if (this.state.value == 0) {
            typeView = (
                <Grid>
                    <Col>
                    <Row style={{'justifyContent': 'center', 'paddingBottom': 20}}>
                        <TextInput
                            placeholder="Time"
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({reps: parseInt(text)})}
                        />
                    </Row>
                    <Row style={{'justifyContent': 'center', 'paddingBottom': 20}}>
                        <TextInput
                            placeholder="Laps"
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({reps: parseInt(text)})}
                        />
                    </Row>
                    <Row style={{'justifyContent': 'center', 'paddingBottom': 20}}>
                        <TextInput
                            placeholder="Distance"
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                            onChangeText={(text) => this.setState({reps: parseInt(text)})}
                        />
                    </Row>
                    </Col>
                </Grid>
            )
        }
        if (this.state.value == 1) {
            typeView = (
                <Grid>
                    <Col>
                        <Row style={{'justifyContent': 'center', 'paddingBottom': 20}} size={1}>
                            <TextInput
                                placeholder="Weight"
                                keyboardType="numeric"
                                style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                                onChangeText={(text) => this.setState({reps: parseInt(text)})}
                            />
                        </Row>
                        <Row style={{'justifyContent': 'center', 'paddingBottom': 20}} size={1}>
                            <TextInput
                                placeholder="Reps"
                                keyboardType="numeric"
                                style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                                onChangeText={(text) => this.setState({reps: parseInt(text)})}
                            />
                        </Row>
                        <Row style={{'justifyContent': 'center', 'paddingBottom': 20}}>
                            <TextInput
                                placeholder="Sets"
                                keyboardType="numeric"
                                style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                                onChangeText={(text) => this.setState({reps: parseInt(text)})}
                            />
                        </Row>
                    </Col>
                </Grid>
            )
        }
        return  (
            <Card title="Quick Log">
                {
                <ScrollView>
                    <Grid>
                        <Col>
                            <Row>
                                <TextInput
                                    placeholder="Exercise Name"
                                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                                    onChangeText={(text) => this.setState({reps: parseInt(text)})}
                                />
                            </Row>
                            <Row style={{'justifyContent': 'center', 'paddingBottom': 20}}>
                                <Text style={{'fontSize': 16}}>Type of Exercise</Text>
                            </Row>
                            <Row style={{'justifyContent': 'space-between', 'paddingLeft' : 20, 'paddingRight' : 20, 'paddingBottom': 20}}>
                                <RadioForm
                                    radio_props={radio_props}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    inital={null}
                                    buttonStyle={{marginRight: 20}}
                                    onPress={ (value) => this.setState({ value }) }
                                    radioStyle={{paddingRight: 20}}
                                    style={{paddingLeft: 40}}
                                />
                            </Row>
                        </Col>
                    </Grid>
                    {typeView}
                    <Grid>
                        <Col>
                            <Row style={{'paddingBottom': 20, 'justifyContent': 'center'}}>
                                <Button raised rounded title="Log Exercise" backgroundColor='#007aff' marginTop={25} marginBottom={25}
                                    onPress={() => this.logExercise(this.state)} buttonStyle={{width: wwidth - 80}}/>
                            </Row>
                        </Col>
                    </Grid>
                </ScrollView>
                }
            </Card>
        );
    }
}

const radio_props = [
  {label: 'Cardio', value: 0 },
  {label: 'Lifting', value: 1 }
];

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    },
    cardText: {
        textAlign: 'center',
        paddingBottom: 10
    },
    cardText1: {
        textAlign: 'center',
        color: 'gray'
    },
    quickPick: {
        paddingBottom: '50px'
    },
    searchbarContainer: {
        backgroundColor: '#EAE9EF',
        borderTopWidth: 0,
        borderBottomWidth: 0
    }
});
module.exports = QuickLogScreen;
