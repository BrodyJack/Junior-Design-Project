import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'
import * as firebase from 'firebase';

class FriendsScreen extends React.Component {
    
    componentDidMount() {
        this.listenForEvents("users", this.itemsRef);
        this.listenForEvents("friends", this.myFriendsRef);
    }
    
    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('users/');
        this.myFriendsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/');
        this.state = {
            selectedOption: {label: "All", value: "all"}
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Friends',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
            headerRight: (
                <Button title="Add Friend" onPress={() => navigation.navigate('AddFriend')}/>
            )
        }
    };
    
    listenForEvents(type, ref) {
        if (type == "users") {
            console.log("ItemsRef: " + ref);
            ref.on('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    items.push(child);
                });

                this.setState({
                    dataSource: items
                });

            });
        } else if (type == "friends") {
            console.log("FriendsRef: " + ref);
            ref.on('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    items.push(child);
                });

                this.setState({
                    currentUserFriends: items
                });

            });
        }
    }
    
    render() {
        options = [
            {
                label: 'Recent',
                value: 'recent'
            },
            {
                label: 'All',
                value: 'all'
            },
            {
                label: 'Suggested',
                value: 'suggested'
            }
        ]
        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }
        return (
            <View style={styles.page}>
                <View style={{ flex: 1 }}>
                    <SegmentedControls 
                        options={ options }
                        onSelection={ setSelectedOption.bind(this) }
                        selectedOption={ this.state.selectedOption }
                        extractText={ (option) => option.label }
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
                        containerStyle={{ marginLeft: 5, marginRight: 5 }}
                    />
                    <SectionList
                        sections={
                            function(state) {
                                friends = [];
                                
                                /**TODO: 
                                - figure out why friend object is only {"added": "1517683295385"}
                                  instead of {"wVw3fL6UfihGi41wGbJMPaxtLCU2": ("added": "1517683295385")}
                                **/
                                if (state.currentUserFriends != null) {
                                    state.currentUserFriends.forEach(function(item) {
                                        friends.push({
                                            firstName: item.val().firstName,
                                            lastName: item.val().lastName,
                                            added: item.val().added
                                        });
                                    })
                                }
                                
                                if (state.selectedOption.value == "all") {
                                    var returnValues = [];
                                    var names = {};
                                    
                                    friends.forEach(function(item) {
                                        console.log(item);
                                    })
                                    for (var i = 0; i < friends.length; i++) {
                                        var currFriend = friends[i];
                                        var sortByFirstName = false;
                                        var letterCategory;
                                        if (sortByFirstName) {
                                            letterCategory = currFriend.firstName[0];
                                        } else {
                                            letterCategory = currFriend.lastName[0];
                                        }
                                        if (letterCategory in names) {
                                            names[letterCategory].push(currFriend.firstName + " " + currFriend.lastName);
                                        } else {
                                            names[letterCategory] = [currFriend.firstName + " " + currFriend.lastName];
                                        }                            
                                    }
                                    var sortedNames = [];
                                    for (var letter in names) {
                                        sortedNames.push(letter);
                                    }
                                    sortedNames.sort();
                                    var sortedDict = {};
                                    for (var index in sortedNames) {
                                        var letter = sortedNames[index]
                                        sortedDict[letter] = names[letter];
                                    }
                                    for (var letter in sortedDict) {
                                        sortedDict[letter].sort();
                                        returnValues.push({title : letter, data: sortedDict[letter]})
                                    }
                                    console.log("Return values: " + JSON.stringify(returnValues));
                                    return returnValues;
                                } else if (state.selectedOption.value == "recent") {
                                    returnValues = [];
                                    console.log("Friends: " + JSON.stringify(friends));
                                    friends.sort(function(a, b) {
                                        return (parseInt(a.added) - parseInt(b.added));
                                    })
                                    friends.forEach(function(friend) {
                                        fullName = friend.firstName + " " + friend.lastName
                                        console.log("Full: " + fullName);
                                        returnValues.push({data: [fullName]});
                                    });
                                    console.log("Return values: " + JSON.stringify(returnValues));
                                    return returnValues;
                                } else if (state.selectedOption.value == "suggested") {
                                    alert("Suggested Friends");
                                    return [];
                                }
                        }(this.state)}
                        
                        renderItem={({item}) => 
                            <Text 
                                style={styles.item}
                                onPress={() => {
                                    alert("You selected " + item);
                                }}>
                                {item}
                            </Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        );
    }
}
// friends = [
//         {
//             firstName: "Brandon",
//             lastName: "Manuel"
//         }, {
//             firstName: "Brody",
//             lastName: "Johnstone"
//         }, {
//             firstName: "Grayson",
//             lastName: "Bianco"
//         }, {
//             firstName: "Jessica",
//             lastName: "Chen"
//         }, {
//             firstName: "Will",
//             lastName: "Stith"
//         }, {
//             firstName: "Bob",
//             lastName: "Smith"
//         }, {
//             firstName: "Brodie",
//             lastName: "Johnson"
//         }
//     ]
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
module.exports = FriendsScreen;