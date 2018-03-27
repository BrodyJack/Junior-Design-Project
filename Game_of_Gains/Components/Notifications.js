import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class NotificationsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Notifications',
        }
    }

    componentDidMount() {
        this.listenForNotifications("notifications", this.notificationsRef, this.props.navigation);
    }

    constructor(props) {
        super(props);
        this.notificationsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notifications/');
        this.state = {
            dataSource: []
        }
    }

    listenForNotifications(type, ref, navigation) {
        ref.on('value', (snap) => {
            var items = [];
            if (snap != null) {
                snap.forEach((child) => {
                    items.push(child);
                });

                this.setState({
                    dataSource: items
                });
            }
        })
    }

    render() {

        dataSource = this.state.dataSource;
        if (dataSource.length == 0) {
            return (
                <Card containerStyle={{padding: 0}}>
                {
                    ["No notifications!"].map((u, i) => {
                    return (
                        <ListItem
                        key={i}
                        roundAvatar
                        title={u}
                        />
                    );
                    })
                }
                </Card>
            );
         } else {
                return (
                    <ScrollView>
                        <Card containerStyle={{padding: 0}}>
                        {
                            dataSource.map((u, i) => {
                            return (
                                <ListItem
                                key={i}
                                roundAvatar
                                title={u.val().details}
                                onPress={() => firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notifications/' + u.key).remove()}
                                />
                            );
                            })
                        }
                        </Card>
                    </ScrollView>
                );
            }
        }
    }

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    }
});

module.exports = NotificationsScreen;
