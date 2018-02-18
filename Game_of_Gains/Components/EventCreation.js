import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
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
        state.contactDetails.uid = firebase.auth().currentUser.uid;
        state.participants.push(state.contactDetails.uid);
        eventKey = Date.now().toString() + Math.floor(Math.random() * 1000);
        try {
            firebase.database().ref('events/' + eventKey + '/').set(state);
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error.toString());
        }

    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create Event'
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.page} behavior="padding">
                <Text>Event Name</Text>
                <TextInput
                    placeholder="Event Name" 
                    style={{borderBottomWidth: 1, width: 350, margin: 10}}
                    onChangeText={(text) => this.setState({eventName: text})}
                />
                <Text>Event Date (**/**/**)</Text>
                <TextInput 
                    placeholder="Event Date" 
                    style={{borderBottomWidth: 1, width: 350, margin: 10, marginBottom: 50}}
                    onChangeText={(text) => this.setState({eventDate: text})}
                />
                <Text>Event Location</Text>
                <TextInput 
                    placeholder="Event Location" 
                    style={{borderBottomWidth: 1, width: 350, margin: 10, marginBottom: 50}}
                    onChangeText={(text) => this.setState({eventLocation: text})}
                />
                <Text>Event Details</Text>
                <TextInput 
                    placeholder="Event Date" 
                    style={{borderBottomWidth: 1, width: 350, margin: 10, marginBottom: 50}}
                    onChangeText={(text) => this.setState({eventDetails: text})}
                />
                <Button
                    onPress={() => this.createEvent(this.state)}
                    title="Create Event!"
                />
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
  })

module.exports = EventCreationScreen;