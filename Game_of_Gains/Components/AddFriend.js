import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';

class AddFriendScreen extends React.Component {

    componentDidMount() {
        this.listenForEvents(this.itemsRef);
    }

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('users/');
        this.state = {
            search: ""
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Friend'
        }
    };

    listenForEvents(ref) {
        ref.on('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    items.push(child);
                });

                this.setState({
                    users: items
                });

        });
    }



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
                    if (users == undefined || state.search == "") {
                        return "";
                    }
                    users.forEach(function(item) {
                        console.log("Name: " + item.val()["displayName"]);
                        console.log("State.search: " + state.search);
                        if (item.val()["displayName"].toUpperCase().includes(state.search.toUpperCase())) {
                            returnString += item.val()["displayName"] + "\n";
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