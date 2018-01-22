import React from 'react';
import { View, Text, Button, TabBarIOS, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class FriendsScreen extends React.Component {
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
        return (
            <View style={{ flex: 1, marginLeft: 7, marginRight: 7}}>
                <NavigationBar
                    title= {{ title: "Friends" }}
                    leftButton={{ title: "Settings", handler: () => alert('Settings') }}
                    rightButton={{ title: "Add Friend", handler: () => alert('Add Friend') }}
                    tintColor='rgba(247,247,247,1.0)'
                />
            </View>
        );
    }
}

module.exports = FriendsScreen;