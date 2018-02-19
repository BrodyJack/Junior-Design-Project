import React from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Profile',
        }
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.sheet}>
                <Text> Profile </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    }
});

module.exports = ProfileScreen;