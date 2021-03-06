import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Card, ListItem } from 'react-native-elements';
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
            data.on('value', (snap) => {
                var items = [];
                if (snap != null && snap.val() != null) {

                    snap.val().forEach((child) => {
                        key = Object.keys(child)[0];
                        var childRef = firebase.database().ref("users/" + key + "/");
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
                }

                this.setState({
                    friendData: items
                });

            });
        } else if (type == "users") {
            data.on('value', (snap) => {
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

        var list = [];
        if (this.state.selectedOption.value == "friends") {
            if (this.state.friendData != undefined) {
                list = this.state.friendData;
            }
        } else if (this.state.selectedOption.value == "global") {
            if (this.state.userData != undefined) {
                list = this.state.userData;
            }
        }
        
        dataSource = [];
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                dataSource.push({name: list[i].name, points: list[i].pointsAllTime});
            }
        }

        dataSource.sort(function(a, b) {
            return b.points - a.points;
        });
        
        // sortedData is the finalized data

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
                <ScrollView>
                <Card containerStyle={{padding: 0}}>
                    {
                        dataSource.map((u, i) => {

                        return (
                            <ListItem
                            key={i}
                            roundAvatar
                            title={u.name}
                            subtitle={u.points}
                            avatar={require('./../img/user.png')}
                            hideChevron
                            />
                        );
                        })
                    }
                </Card>
                </ScrollView>
                {/*<FlatList
                        data={sortedData}
                        horizontal={false}
                        numColumns={2}
                        renderItem={({item}) => 
                            <Card
                                style={styles.item}
                                onPress={() => {
                                    alert("You selected " + item);
                                }}>
                                {item}
                            </Card>}
                        keyExtractor={(item, index) => index}
                            />*/}
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