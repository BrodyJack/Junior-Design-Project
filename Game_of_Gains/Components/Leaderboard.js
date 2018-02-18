import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons';
import * as firebase from 'firebase';

class LeaderboardScreen extends React.Component {
    
    componentDidMount() {
        this.listenForEvents("friends", this.friends);
        this.listenForEvents("users", this.users);
    }

    constructor(props) {
        super(props);
        this.currentUserId = firebase.auth().currentUser.uid;
        this.friends = firebase.database().ref("users/" + this.currentUserId + "/friends/");
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
            headerRight: (
                <Ionicons 
                    name='ios-options'
                    size={26}
                    onPress={() => alert('options')}
                />
            )
        }
    };

    listenForEvents(type, data) {
        if (type == "friends") {
            data.once('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    var childRef = firebase.database().ref("users/" + child.key + "/");
                    childRef.once('value', (user) => {
                        var item = {
                            name: user.val().displayName,
                            pointsAllTime: user.val().exerciseInfo.pointsAllTime,
                            pointsWeek: user.val().exerciseInfo.pointsWeek,
                            pointsToday: user.val().exerciseInfo.pointsToday
                        };
                        items.push(item);
                    }
                 )
                });

                this.setState({
                    friendData: items
                });

            });
        } else if (type == "users") {
            data.once('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                    var item = {
                        name: child.val().displayName,
                        pointsAllTime: child.val().exerciseInfo.pointsAllTime,
                        pointsWeek: child.val().exerciseInfo.pointsWeek,
                        pointsToday: child.val().exerciseInfo.pointsToday
                    };
                    items.push(item);
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
                <FlatList
                        data={
                            function(state) {
                                var list = [];
                                if (state.selectedOption.value == "friends") {
                                    if (state.friendData != undefined) {
                                        list = state.friendData;
                                    }
                                } else if (state.selectedOption.value == "global") {
                                    if (state.userData != undefined) {
                                        list = state.userData;
                                    }
                                }
                                var sortedData = [];
                                var isSorted = [];
                                for (var i = 0; i < list.length; i++) {
                                    isSorted.push(false);
                                }
                                while (sortedData.length != list.length * 2) {
                                    var maxScore = 0;
                                    var idxToAdd = 0;
                                    for (var i = 0; i < list.length; i++) {
                                        if (!isSorted[i] && list[i].pointsAllTime > maxScore) {
                                            maxScore = list[i].pointsAllTime;
                                            idxToAdd = i;
                                        }
                                    }
                                    var toAdd = list[idxToAdd];
                                    sortedData.push(toAdd.name);
                                    sortedData.push(toAdd.pointsAllTime);
                                    isSorted[idxToAdd] = true;
                                }
                                return sortedData;
                            
                            }(this.state)}
                        horizontal={false}
                        numColumns={2}
                        renderItem={({item}) => 
                            <Text 
                                style={styles.item}
                                onPress={() => {
                                    alert("You selected " + item);
                                }}>
                                {item}
                            </Text>}
                        keyExtractor={(item, index) => index}
                    />
              </View>
            </View>
        );
    }
}

const {height, width} = Dimensions.get('window');
const itemWidth = width/2;
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
      width: itemWidth
    },
  })

module.exports = LeaderboardScreen;