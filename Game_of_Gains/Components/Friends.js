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
            <View style={{ flex: 1, marginLeft: 7, marginRight: 7}}>
                <NavigationBar
                    title= {{ title: "Friends" }}
                    leftButton={{ title: "Settings", handler: () => alert('Settings') }}
                    rightButton={{ title: "Add Friend", handler: () => alert('Add Friend') }}
                    tintColor='rgba(247,247,247,1.0)'
                />
                <View style={{ flex: 1, marginLeft: 7, marginRight: 7}}>
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
                    />
                    <Text>Selected option: {this.state.selectedOption.label || 'none'}</Text>
                    <SectionList
                        sections={ function() {
                                var returnValues = [];
                                var names = {};
                                for (var i = 0; i < friends.length; i++) {
                                    var currFriend = friends[i].name;
                                    var letterCategory = currFriend[0];
                                    if (letterCategory in names) {
                                        names[letterCategory].push(currFriend);
                                    } else {
                                        names[letterCategory] = [currFriend];
                                    }                            
                                }
                                for (var letter in names) {
                                    names[letter].sort();
                                    returnValues.push({title : letter, data: names[letter]})
                                }
                                return returnValues;
                        }()}
                        
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
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
            name: "Brandon Manuel",
        }, {
            name: "Brody Johnstone",
        }, {
            name: "Grayson Bianco",
        }, {
            name: "Jessica Chen",
        }, {
            name: "Will Stith",
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