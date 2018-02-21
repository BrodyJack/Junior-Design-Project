import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons';
import * as firebase from 'firebase';

class EventsScreen extends React.Component {

    componentDidMount() {
        this.listenForEvents(this.itemsRef);
    }
    
    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('events/');
        this.state = {
            selectedOption: {label: "Near", value: "Events Near You"}
        }   
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Events',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
            headerRight: (
                <Button title="+" onPress={() => navigation.navigate('EventCreation')}/>
            )
        }
    };

    listenForEvents(itemsRef) {
        itemsRef.on('value', (snap) => {
            var allEvents = [];
            var ownedEvents = [];

            snap.forEach((child) => {
                if (child.val().contactDetails.uid == firebase.auth().currentUser.uid) {
                    ownedEvents.push(child);
                }
                allEvents.push(child);
            });

            this.setState({
                allEvents: allEvents,
                ownedEvents: ownedEvents
            });

        });
    }

    render() {

        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }

        var dataSource;

        if (this.state.selectedOption.label == 'Near' && this.state.allEvents != null) {
            dataSource = this.state.allEvents;
        } else if (this.state.selectedOption.label == 'Owned' && this.state.ownedEvents != null) {
            dataSource = this.state.ownedEvents;
        } else {
            dataSource = [];
        }

        return (
            <View style={styles.page}>
                <View style={styles.container}>
                <SegmentedControls
                    options={ options }
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedOption }
                    extractText={ (option) => option.value }
                    testOptionEqual={ (a, b) => {
                        if (!a || !b) {
                            return false;
                        }
                        return a.label === b.label
                    }}                        
                    tint={'#007AFF'}
                    backTint= {'white'}
                    selectedTint= {'white'}
                    selectedBackgroundColor= {'#007AFF'}
                    containerStyle={{ margin: 5 }}
                />
                <ScrollView>
                <Card containerStyle={{padding: 0}}>
                    {

                        dataSource.map((u, i) => {

                        return (
                            <ListItem
                            key={i}
                            roundAvatar
                            title={u.val().eventName}
                            avatar={require('./../img/user.png')}
                            onPress={() => this.props.navigation.navigate('EventDetails', { name: u.val().eventName, reference: u.val(), eventKey: u.key })}
                            />
                        );
                        })
                    }
                </Card>
                </ScrollView>
              </View>
            </View>
        );
    }
}

const options = [
    {
        label: 'Near',
        value: 'Events Near You'
    },
    {
        label: 'Owned',
        value: 'Your Events'
    }
]

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

module.exports = EventsScreen;