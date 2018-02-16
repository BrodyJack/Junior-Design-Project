import React from 'react';
import { Alert, View, Text, Button, SectionList, StyleSheet, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';

class AddFriendScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            search: "",
            users: this.props.navigation.state.params.prevState.users,
            friends: this.props.navigation.state.params.prevState.currFriends,
            currentUserId: firebase.auth().currentUser.uid
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Friend'
        }
    };



    render() {
        return (
            <View style={styles.page}>
                <SearchBar
                    lightTheme
                    onChangeText={(text) => this.setState({search: text})}
                />
                <SectionList sections = {function(state) {
                    users = state.users;
                    friends = state.friends;
                    if (users == undefined || state.search == "") {
                        return [];
                    }
                    returnFriends = [];
                    var nonFriends = {
                        title: "Not Friends",
                        data: []
                    };
                    var prevFriends = {
                        title: "Already Friends",
                        data: []
                    };
                    users.forEach(function(item) {
                        if (item.key != state.currentUserId) {
                            
                            if (item.val()["displayName"].toUpperCase().includes(state.search.toUpperCase())) {
                                isFriend = false;
                                friends.forEach(function(friend) {
                                    if (item.key == Object.keys(friend)[0]) {
                                        isFriend = true;
                                    }
                                });
                                if (isFriend) {
                                    if (prevFriends.data == undefined) {
                                        prevFriends.data = [item.val()["displayName"]];
                                    } else {
                                        prevFriends.data.push(
                                            item.val()["displayName"]
                                        );
                                    }
                                } else {
                                    if (nonFriends.data == undefined) {
                                        nonFriends.data = [item.val()["displayName"]];
                                    } else {
                                        nonFriends.data.push(
                                            item.val()["displayName"]
                                        );
                                    }
                                }
                            }
                        }
                    });
                    if (nonFriends.data != undefined) {
                        returnFriends.push(nonFriends);
                    }
                    if (prevFriends.data != undefined) {
                        returnFriends.push(prevFriends);
                    }
                    return returnFriends;                
                }(this.state)}
                renderItem={({item, section}) => 
                    <Text 
                        style={styles.item}
                        onPress={() => {
                            if (section.title == "Not Friends") {
                                Alert.alert(
                                  'Add Friend?',
                                  'Are you sure you want to add ' + item + ' as a friend?',
                                  [
                                      //TODO: actually add a friend here if the user selects yes
                                    {text: 'Yes', onPress: () => Alert.alert("Confirmed", "You added " + item + " as a friend!")},
                                    {text: 'No', onPress: () => Alert.alert("Cancelled", "You did not add " + item + " as a friend"), style: 'cancel'}
                                  ],
                                  { cancelable: false }
                                )
                            } else if (section.title == "Already Friends") {
                                Alert.alert(
                                    'Already Friends',
                                    'You are already friends with ' + item
                                )
                            }
                        }}>
                        {item}
                    </Text>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
                />
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

module.exports = AddFriendScreen;