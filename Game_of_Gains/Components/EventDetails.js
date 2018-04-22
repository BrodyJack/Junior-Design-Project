import React from 'react';
import { Alert, View, Text, SectionList, StyleSheet, Image, ScrollView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { Card, ListItem, Button } from 'react-native-elements';
import * as firebase from 'firebase';

class EventDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Event Details",
        }
    }; 

    constructor(props) {
        super(props);
        this.state = {
            going: props.navigation.state.params.reference.participants.length
        }
    }

    joinEvent(state) {
        var eventKey = this.props.navigation.state.params.eventKey;
        var eventPath = '/events/' + eventKey + '/participants/';
        var userPath = '/users/' + firebase.auth().currentUser.uid + '/joinedEvents/';


        if (this.props.navigation.state.params.reference.contactDetails.uid
            == firebase.auth().currentUser.uid) {
                Alert.alert('Unable to Join', 'You are the creator of this event!');
                return;
        } 
 
        firebase.database().ref(eventPath).once('value').then(function(snapshot) {
            var participants = snapshot.val();
            if (participants.includes(firebase.auth().currentUser.uid)) {
                // User is already participating
                Alert.alert('Oops!', 'You have already joined this event')
                return;
            }
            participants.push(firebase.auth().currentUser.uid);
            // Update Event Participants
            firebase.database().ref(eventPath).set(participants);
            // Update User's Joined Events
            firebase.database().ref(userPath).once('value')
                .then(function(joinedEvents) {
                    var updated = joinedEvents.val();
                    updated.push(eventKey);
                    firebase.database().ref(userPath).set(updated);
            });

            Alert.alert('Success!', 'You joined ' + this.props.navigation.state.params.reference.eventName);
        });
    }

    render() {
        // Example, playing with cards
        return (
            <Card
            title={this.props.navigation.state.params.reference.eventName}
            image={require('../img/techgreen.jpg')}>
            <Text style={{marginBottom: 10}}>
                Creator: {this.props.navigation.state.params.reference.contactDetails.display}
            </Text>
            <Text style={{marginBottom: 10}}>
                Date: {this.props.navigation.state.params.reference.eventDate}
            </Text>
            <Text style={{marginBottom: 10}}>
                Location: {this.props.navigation.state.params.reference.eventLocation}
            </Text>
            <Text style={{marginBottom: 10}}>
                Details: {this.props.navigation.state.params.reference.eventDetails}
            </Text>
            <Text style={{marginBottom: 10}}>
                # Going: {this.state.going}
            </Text>
            <Button
                backgroundColor='#03A9F4'
                onPress={() => this.joinEvent(this.state)}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='RSVP' />
            </Card>
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

module.exports = EventDetailsScreen;