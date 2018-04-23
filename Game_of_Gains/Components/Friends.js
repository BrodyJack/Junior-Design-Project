import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Card, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'
import * as firebase from 'firebase';

class FriendsScreen extends React.Component {
    
    componentDidMount() {
        this.listenForEvents("users", this.itemsRef, this.props.navigation);
        this.listenForEvents("friends", this.myFriendsRef, this.props.navigation);
    }
    
    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('users/');
        this.myFriendsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/');
        this.state = {
            selectedOption: {label: "All", value: "all"},
            currentUserId: firebase.auth().currentUser.uid
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
                <Button title="Add" onPress={() => navigation.navigate('AddFriend', {prevState: navigation.state})}/>
            )
        }
    };
    
    listenForEvents(type, ref, navigation) {
        if (type == "users") {
            ref.on('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    items.push(child);
                });

                this.setState({
                    dataSource: items
                });
                navigation.state.users = items;

            });
        } else if (type == "friends") {
            ref.on('value', (snap) => {
                var items = [];
                // snap.forEach((child) => {
                //     items.push({
                //         [child.key]: child
                //     })
                // });
                // 
                if (snap != null && snap.val() != null) {
                    snap.val().forEach(function(friendObj) {
                        items.push(friendObj);
                    })
                }
                this.setState({
                    currentUserFriends: items
                });
                navigation.state.currFriends = items;
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
                                if (state.currentUserFriends == undefined) {
                                    return [];
                                }
                                friends = [];
                                if (state.currentUserFriends != null) {
                                    state.currentUserFriends.forEach(function(item) {
                                        var currFriendId = Object.keys(item)[0];
                                        if (currFriendId != state.currentUserId) {
                                            friends.push({
                                                displayName: item[currFriendId]["displayName"],
                                                added: item[currFriendId]["added"]
                                            });
                                        }
                                    })
                                }
                                if (friends.length == 0) {
                                    return [];
                                }
                                if (state.selectedOption.value == "all") {
                                    var returnValues = [];
                                    var names = {};
                                    for (var i = 0; i < friends.length; i++) {
                                        var currFriend = friends[i];
                                        // var sortByFirstName = false;
                                        var letterCategory = currFriend.displayName[0];
                                        // if (sortByFirstName) {
                                        //     letterCategory = currFriend.firstName[0];
                                        // } else {
                                        //     letterCategory = currFriend.lastName[0];
                                        // }
                                        if (letterCategory in names) {
                                            names[letterCategory].push(currFriend.displayName);
                                        } else {
                                            names[letterCategory] = [currFriend.displayName];
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
                                    return returnValues;
                                } else if (state.selectedOption.value == "recent") {
                                    returnValues = [];
                                    friends.sort(function(a, b) {
                                        return (parseInt(b.added) - parseInt(a.added));
                                    })
                                    friends.forEach(function(friend) {
                                        returnValues.push({data: [friend.displayName]});
                                    });
                                    return returnValues;
                                }
                                
                        }(this.state)}
                        
                        renderItem={({item}) => 
                            // <Text 
                            //     style={styles.item}
                            //     onPress={() => {
                            //         alert("You selected " + item);
                            //     }}>
                            //     {item}
                            // </Text>
                            <Card containerStyle={{padding: 0, margin: 0}}>
                                <ListItem
                                    key={item.key}
                                    roundAvatar
                                    title={item}
                                    avatar={require('./../img/user.png')}
                                    onPress={() => console.log('test')}
                                    hideChevron
                                />
                            </Card>
                            }
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
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
      fontSize: 30,
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