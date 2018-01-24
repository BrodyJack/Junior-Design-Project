import React from 'react';
import { View, Text, Button } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import EventsScreen from './Components/Events'
import FriendsScreen from './Components/Friends'
import HomeScreen from './Components/Home'
import ChallengesScreen from './Components/Challenges'
import LeaderboardScreen from './Components/Leaderboard'

const RootTabs = TabNavigator({
    Events: {
        screen: EventsScreen
    },
    Friends: {
        screen: FriendsScreen,
    },
    Home: {
        screen: HomeScreen,
    },
    Challenges: {
        screen: ChallengesScreen,
    },
    Leaderboard: {
        screen: LeaderboardScreen,
    },
}, {
    initialRouteName: 'Home',
    animationEnabled: true,
});

export default RootTabs;