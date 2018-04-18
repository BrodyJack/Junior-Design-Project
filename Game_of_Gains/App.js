import React from 'react';
import { View, Text, Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import EventsScreen from './Components/Events'
import FriendsScreen from './Components/Friends'
import HomeScreen from './Components/Home'
import ChallengesScreen from './Components/Challenges'
import LeaderboardScreen from './Components/Leaderboard'
import LandingScreen from './Components/Landing'
import SignInScreen from './Components/SignIn'
import SignUpScreen from './Components/SignUp'
import SettingsScreen from './Components/Settings'
import EventDetailsScreen from './Components/EventDetails'
import EventCreationScreen from './Components/EventCreation'
import AddFriendScreen from './Components/AddFriend'
import ProfileScreen from './Components/Profile'
import NotificationsScreen from './Components/Notifications'
import ExercisesScreen from './Components/Exercises'
import RecentActivityScreen from './Components/RecentActivity'
import AddExercise from './Components/AddExercise'
import ChallengeDetailsScreen from './Components/ChallengeDetails'

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
    tabBarPosition: "bottom"
});

const InitialNav = StackNavigator({
    Landing: {
        screen: LandingScreen
    },
    SignUp: {
        screen: SignUpScreen
    },
    SignIn: {
        screen: SignInScreen
    },
    Root: {
        screen: RootTabs,
    },
    Settings: {
        screen: SettingsScreen,
    },
    EventDetails: {
        screen: EventDetailsScreen,
    },
    EventCreation: {
        screen: EventCreationScreen
    },
    AddFriend: {
        screen: AddFriendScreen
    },
    Profile: {
        screen: ProfileScreen
    },
    Notifications: {
        screen: NotificationsScreen
    },
    Exercises: {
        screen: ExercisesScreen
    },
    AddExercise: {
        screen: AddExercise
    },
    RecentActivity: {
        screen: RecentActivityScreen
    },
    ChallengeDetails: {
        screen: ChallengeDetailsScreen
    }
}, {
    headerMode: 'float'
});

export default InitialNav;
