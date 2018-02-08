import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'
import * as firebase from 'firebase';

class LeaderboardScreen extends React.Component {
    
    componentDidMount() {
        this.listenForEvents("friends", this.friends);
        this.listenForEvents("users", this.users);
    }

    constructor(props) {
        super(props);
        this.friends = firebase.database().ref("users/uid1/friends/");
        this.users = firebase.database().ref("users/");
        this.state = {
            selectedOption: {label: "Friends", value: "friends"}
        } 
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Leaderboard',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
        }
    };

    listenForEvents(type, data) {
        if (type == "friends") {
            console.log("friend listen");
            data.once('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    var childRef = firebase.database().ref("users/" + child.key + "/");
                    childRef.once('value', (user) => {
                        var item = {
                            name: user.val().displayName,
                            allTimeScore: user.val().exerciseInfo.pointsAllTime
                        };
                        console.log("item: " + item.name + " " + item.allTimeScore);
                        items.push(item);
                    }
                 )
                });

                this.setState({
                    friendData: items
                });

            });
        } else if (type == "users") {
            console.log("users listen");
            data.once('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    if (child.key == "uid1" || child.key == "uid2" || child.key == "uid3" || child.key == "uid4") {
                        var item = {
                            name: child.val().displayName,
                            allTimeScore: child.val().exerciseInfo.pointsAllTime
                        };
                        items.push(item);
                    }
                });

                this.setState({
                    userData: items
                });
            });
        }
    }

    render() {
        options = [
            {
                label: 'Friends',
                value: 'friends'
            },
            {
                label: 'Global',
                value: 'global'
            },
        ]
        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }
        return (
            <View style={styles.page}>
                <View style={styles.container}>
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
                                var list = [];
                                var titleName;
                                if (state.selectedOption.value == "friends") {
                                    console.log("friend selected");
                                    if (state.friendData != undefined) {
                                        console.log("friendData used");
                                        list = state.friendData;
                                    }
                                    titleName = "Friends Leaderboard";
                                } else if (state.selectedOption.value == "global") {
                                    console.log("global selected");
                                    if (state.userData != undefined) {
                                        console.log("userData used");
                                        list = state.userData;
                                    }
                                    titleName = "Global Leaderboard";
                                }
                                var returnValues = [];
                                var sortedData = [];
                                var isSorted = [];
                                for (var i = 0; i < list.length; i++) {
                                    isSorted.push(false);
                                }
                                while (sortedData.length != list.length) {
                                    var maxScore = 0;
                                    var idxToAdd = 0;
                                    for (var i = 0; i < list.length; i++) {
                                        if (!isSorted[i] && list[i].allTimeScore > maxScore) {
                                            maxScore = list[i].allTimeScore;
                                            idxToAdd = i;
                                        }
                                    }
                                    var toAdd = list[idxToAdd];
                                    sortedData.push(toAdd.name + ": " + toAdd.allTimeScore);
                                    isSorted[idxToAdd] = true;
                                }
                                returnValues.push({title : titleName, data: sortedData})
                                return returnValues;
                            
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

module.exports = LeaderboardScreen;