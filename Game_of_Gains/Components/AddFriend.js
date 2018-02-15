import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, TextInput } from 'react-native';
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
                <Text style={{textAlign: 'center', paddingTop: 50}}>{function(state) {
                    returnString = "";
                    users = state.users;
                    friends = state.friends;
                    if (users == undefined || state.search == "") {
                        return "";
                    }
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
                                    returnString += item.val()["displayName"] + " - is already Friend\n";
                                } else {
                                    returnString += item.val()["displayName"] + "\n";
                                }
                            }
                        }
                    });
                    return returnString;
                }(this.state)}</Text>
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