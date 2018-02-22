import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import IconBadge from 'react-native-icon-badge';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class RecentActivityScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Recent Activity',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            BadgeCount: 0
        }
    }

    render() {

        const users = [
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brody',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }
           ];

        return (
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
            <IconBadge
                MainElement={
                <Card title="test"/>
                    
                }
                BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{this.state.BadgeCount}</Text>
                }
                IconBadgeStyle={
                {width:20,
                height:20,
                backgroundColor: '#FF00EE'}
                }
                Hidden={this.state.BadgeCount==0}
                />
            <Button
                title="Increment"
                onPress={() => this.setState(prevState => { return { BadgeCount: prevState.BadgeCount+1};})}
            />
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

module.exports = RecentActivityScreen;
