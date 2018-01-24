import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'

class FriendsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {label: "All", value: "all"},
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
                </View>
            </View>
        );
    }
}

module.exports = FriendsScreen;