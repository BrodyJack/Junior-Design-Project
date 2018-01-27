import React from 'react';
import { View, Text, Button } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class LandingScreen extends React.Component {
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    onPress={() => this.props.navigation.navigate('SignIn')}
                    title="Sign In"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    title="Sign Up"
                />
            </View>
        );
    }
}

module.exports = LandingScreen;