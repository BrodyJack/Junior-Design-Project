import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class LandingScreen extends React.Component {
    
    render() {
        return (
            <View style={styles.page}>
                <Button
                    onPress={() => this.props.navigation.navigate('MainNav')}
                    title="Sign In (Test)"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

module.exports = LandingScreen;