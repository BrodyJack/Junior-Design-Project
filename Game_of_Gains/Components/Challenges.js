import React from 'react';
import { View, Text, Button } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class ChallengesScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Challenges',
        tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
            name={focused ? 'ios-medal' : 'ios-medal-outline'}
            size={26}
            style={{ color: tintColor }}
        />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    onPress={() => this.props.navigation.navigate('Home')}
                    title="Go to home"
                />
            </View>
        );
    }
}

module.exports = ChallengesScreen;