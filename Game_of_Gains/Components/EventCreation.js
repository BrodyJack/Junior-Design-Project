import React from 'react';
import { Alert, View, Text, SectionList, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Card, ListItem, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
import './Global.js';

class EventCreationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventDate: "",
            eventDetails: "",
            eventLocation: "",
            participants: [],
            contactDetails: {
                display: global.username,
                uid: ""
            },
            requireRSVP: false
        }
    }

    async createEvent(state) {
        if (!this.eventIsValid(state)) { 
            Alert.alert("Oops!", "You haven't filled out all of the event details!");
            return;
        }
        state.contactDetails.uid = firebase.auth().currentUser.uid;
        state.participants.push(state.contactDetails.uid);
        eventKey = Date.now().toString() + Math.floor(Math.random() * 1000);
        try {
            firebase.database().ref('events/' + eventKey + '/').set(state);
            userPath = '/users/' + firebase.auth().currentUser.uid + '/createdEvents/';
            firebase.database().ref(userPath).once('value', function(snapshot) {
                updatedCreated = snapshot.val();
                updatedCreated.push(eventKey);
                firebase.database().ref(userPath).set(updatedCreated);
            });
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error.toString());
        }

    }

    eventIsValid(state) {
        return (state.eventName != "" &&
            state.eventDate != "" &&
            state.eventLocation != "" &&
            state.eventDetails != "");
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create Event'
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.page} behavior="padding">
                <Card>
                <Text style={styles.cardText}>Event Name</Text>
                <TextInput
                    placeholder="Event Name" 
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                    onChangeText={(text) => this.setState({eventName: text})}
                />
                <Text style={styles.cardText}>Event Date (**/**/**)</Text>
                <TextInput 
                    placeholder="Event Date" 
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                />
                <Text style={styles.cardText}>Event Location</Text>
                <TextInput 
                    placeholder="Event Location" 
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                />
                <Text style={styles.cardText}>Event Details</Text>
                <TextInput 
                    placeholder="Event Details" 
                    style={{borderWidth: 1, borderRadius: 5, borderColor: 'black', width: wwidth - 80, height: 35, backgroundColor: 'white', marginBottom: 20, textAlign: 'center', alignSelf:'center'}}
                />
                <Button raised rounded title="Create Event!" backgroundColor='#007aff' marginTop={25}
                        onPress={() => this.createEvent(this.state)}/>
                <Text></Text>
                <Button raised rounded title="Cancel" backgroundColor='#ff3b30' marginTop={25}
                        onPress={() => this.props.navigation.goBack()}/>
                </Card>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
     flex: 1
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 14,
      height: 44,
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16
    },
  })

module.exports = EventCreationScreen;