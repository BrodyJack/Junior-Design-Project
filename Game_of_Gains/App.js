import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

const EventsScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Events Screen</Text>
    </View>
);

const FriendsScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Friends Screen</Text>
    </View>
);

const HomeScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
);

const ChallengesScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Challenges Screen</Text>
    </View>
);

const LeaderboardScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Leaderboard Screen</Text>
    </View>
);

const RootTabs = TabNavigator({
    Events: {
        screen: EventsScreen,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
        },
    },
    Friends: {
        screen: FriendsScreen,
        navigationOptions: {
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
        },
    },
    Challenges: {
        screen: ChallengesScreen,
        navigationOptions: {
            tabBarLabel: 'Challenges',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-medal' : 'ios-medal-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
        },
    },
    Leaderboard: {
        screen: LeaderboardScreen,
        navigationOptions: {
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
        },
    },

}, {
    initialRouteName: 'Home',
    animationEnabled: true,
});

export default RootTabs;