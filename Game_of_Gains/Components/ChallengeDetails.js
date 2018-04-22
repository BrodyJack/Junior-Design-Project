import React from 'react';
import { Alert, View, Text, SectionList, StyleSheet, Image, ScrollView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { Card, ListItem, Button } from 'react-native-elements';
import * as firebase from 'firebase';

class ChallengeDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Challenge Details",
        }
    }; 

    constructor(props) {
        super(props);
        this.state = {
            item: props.navigation.state.params.reference
        }
    }

    submitChallenge(state) {
        var attendees = state.item.usersCompleted;
        if (attendees != null && attendees.includes(firebase.auth().currentUser.uid)) {
            Alert.alert('Challenge', 'You have already submitted this challenge!');
            this.props.navigation.goBack();
            return;
        }

        var userPath = '/history/' + firebase.auth().currentUser.uid + '/alltime/';
        var pointsPath = '/users/' + firebase.auth().currentUser.uid + '/exerciseInfo/pointsAllTime';
        firebase.database().ref(userPath).once('value').then(function(snapshot) {
            var exerciseHistory = snapshot.val();
            historyKeys = Object.keys(exerciseHistory);
            // console.log(Object.keys(exerciseHistory));
            for (var i = 0; i < historyKeys.length; i++) {
                var currExercise = exerciseHistory[historyKeys[i]];
                if (currExercise.name == state.item.exerciseName &&
                    currExercise.reps >= state.item.repsNeeded) {
                        /* If we get here, it worked! They can submit the challenge */

                        // Add user to completed list in the challenge
                        firebase.database().ref('/challenges/').once('value').then(function(snapshot) {
                            challengesArray = snapshot.val();
                            //console.log(challengesArray);
                            currIndex = challengesArray.findIndex(function(element) {
                                console.log(element);
                                return element.challengeName == state.item.challengeName;
                            });
                            theChallenge = challengesArray[currIndex];

                            if (!theChallenge['usersCompleted']) {
                                theChallenge['usersCompleted'] = [firebase.auth().currentUser.uid];
                            } else {
                                theChallenge['usersCompleted'].push(firebase.auth().currentUser.uid);
                            }

                            var updates = {};
                            updates['/challenges/' + currIndex + '/'] = theChallenge;
                            try {
                                firebase.database().ref().update(updates);
                            } catch (error) {
                                console.log(error.toString());
                                Alert.alert('Oops!', 'Something went wrong on our end. Please try again later.');
                                return;
                            }
                        });
                        // Give the user points
                        firebase.database().ref(pointsPath).once('value').then(function(snapshot) {
                            currPoints = snapshot.val();
                            var updates = {};
                            updates[pointsPath] = currPoints + state.item.challengePoints;
                            try {
                                firebase.database().ref().update(updates);
                            } catch (error) {
                                console.log(error.toString());
                                Alert.alert('Oops!', 'Something went wrong on our end. Please try again later.');
                                return;
                            }
                        });
                        
                        Alert.alert('Success!', 'You submitted the challenge and earned ' + state.item.challengePoints + ' points!');
                        return;
                    }

            }

            Alert.alert("Not yet!", "You have not yet completed the requirements for this challenge. Keep going!");
            return;
        });

        this.props.navigation.goBack();
    }

    render() {
        // Example, playing with cards
        return (
            <Card
            title={this.state.item.challengeName + '\n\n' + this.state.item.challengePoints + ' points!'}
            image={require('../img/challenge.png')}>
            <Text style={{marginBottom: 10}}>
                Creator: Game of Gains
            </Text>
            <Text style={{marginBottom: 10}}>
                Start Date: {this.state.item.challengeStartDate}
            </Text>
            <Text style={{marginBottom: 10}}>
                End Date: {this.state.item.challengeEndDate}
            </Text>
            <Text style={{marginBottom: 10}}>
                Details: {this.state.item.challengeDetails}
            </Text>
            <Text style={{marginBottom: 10}}>
                # Completed: {this.state.item.usersCompleted ? this.state.item.usersCompleted.length : 0}
            </Text>
            <Button
                backgroundColor='#03A9F4'
                onPress={() => 
                    Alert.alert(
                        'Submit Challenge?',
                        'Are you sure you want to see if you have completed this challenge?',
                        [
                          {text: 'Yes', onPress: () => this.submitChallenge(this.state)},
                          {text: 'No', onPress: () => Alert.alert("Cancelled", "You chose not to attempt to submit the challenge"), style: 'cancel'}
                        ],
                        { cancelable: false }
                      )}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Submit Challenge' />
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

module.exports = ChallengeDetailsScreen;