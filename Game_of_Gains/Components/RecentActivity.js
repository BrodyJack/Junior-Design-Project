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
            dataSource: [],
            BadgeCount: 0
        }
    }

    componentDidMount() {
        this.loadMessage(2000, "Brody followed Brandon!");
        this.loadMessage(2500, "Jessica just logged a one-hour run!");
        this.loadMessage(3700, "Grayson just broke his deadlift record!");
        this.loadMessage(4300, "Will hit his goal of 30 pull-ups!");
        this.loadMessage(1150, "Brandon completed this week's challenge!");
    }

    loadMessage(waitTime, message) {
        setTimeout(function(theThis) {
            tmp = theThis.state.dataSource;
            tmp.push(message);
            theThis.setState({
                dataSource: tmp
            })
        }, waitTime, this);
    }

    render() {

        return (
            <ScrollView>
                <Card containerStyle={{padding: 0}}>
                {
                    this.state.dataSource.map((u, i) => {
                    return (
                        <ListItem
                        key={i}
                        roundAvatar
                        title={u}
                        onPress={() => console.log('test')}
                        hideChevron
                        />
                    );
                    })
                }
                </Card>
            </ScrollView>
        );

        // return (
        //     <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
        //     <IconBadge
        //         MainElement={
        //         <Card title="test"/>
                    
        //         }
        //         BadgeElement={
        //         <Text style={{color:'#FFFFFF'}}>{this.state.BadgeCount}</Text>
        //         }
        //         IconBadgeStyle={
        //         {width:20,
        //         height:20,
        //         backgroundColor: '#FF00EE'}
        //         }
        //         Hidden={this.state.BadgeCount==0}
        //         />
        //     <Button
        //         title="Increment"
        //         onPress={() => this.setState(prevState => { return { BadgeCount: prevState.BadgeCount+1};})}
        //     />
        //     </View>
        // );
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    }
});

module.exports = RecentActivityScreen;
