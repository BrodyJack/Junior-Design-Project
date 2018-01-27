import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'

class FriendsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {label: "All", value: "all"}
        }   
    }
    static navigationOptions = {
        tabBarLabel: 'Friends',
        tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
            name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
            size={26}
            style={{ color: tintColor }}
        />
        ),
    };

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
            <View style={{ flex: 1 }}>
                <NavigationBar
                    title= {{ title: "Friends" }}
                    leftButton={{ title: "Settings", handler: () => alert('Settings') }}
                    rightButton={{ title: "Add Friend", handler: () => alert('Add Friend') }}
                    tintColor='rgba(247,247,247,1.0)'
                />
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
                                if (state.selectedOption.value == "all") {
                                    var returnValues = [];
                                    var names = {};
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
                                    return returnValues;
                                } else if (state.selectedOption.value == "recent") {
                                    alert("Recent");
                                    return [];
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
friends = [
        {
            firstName: "Brandon",
            lastName: "Manuel"
        }, {
            firstName: "Brody",
            lastName: "Johnstone"
        }, {
            firstName: "Grayson",
            lastName: "Bianco"
        }, {
            firstName: "Jessica",
            lastName: "Chen"
        }, {
            firstName: "Will",
            lastName: "Stith"
        }, {
            firstName: "Bob",
            lastName: "Smith"
        }, {
            firstName: "Brodie",
            lastName: "Johnson"
        }
    ]
const styles = StyleSheet.create({
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