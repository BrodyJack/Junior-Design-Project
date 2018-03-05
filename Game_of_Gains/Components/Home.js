import React from 'react';
import { AsyncStorage, View, Text, Button, SectionList, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
import './Global.js';
class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-person' : 'ios-person-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
            title: 'Home',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
            headerRight: (
                <Button title="Quick Log" onPress={() => {navigation.navigate('Exercises')}}/>
            )
        }
    };

    render() {

        const users = [
            {
               name: 'brandon',
            },
            {
                name: 'brody',
            },
            {
                name: 'jessica',
            }
           ];

        wwidth = Dimensions.get('window').width;

        return (
            <ScrollView>
            <Grid>
            <Row size={25}>
            <Col onPress={() => this.props.navigation.navigate('Exercises')}>
                <Card title="Exercises">
                {
                    users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                        />
                        <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                    })
                }
                </Card>
            </Col>
            <Col onPress={() => this.props.navigation.navigate('RecentActivity')}>
                <Card title="Friends Feed">
                {
                    users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                        />
                        <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                    })
                }
                </Card>
            </Col>
            </Row>
            <Row size={50}>
                <Col onPress={() => console.log('Tapped!')}>
                    <Card title="Progress Chart" containerStyle={{height: 275}}>
                        <View>
                            <Image
                                resizeMode='stretch'
                                source={require('./../img/simplegraph.png')}
                                style={{width: wwidth - 70, height: 200}}
                            />
                        </View>
                    </Card>
                </Col>
            </Row>
            <Row size={25}>
            <Col onPress={() => this.props.navigation.navigate('Notifications')}>
                <Card title="Notifications">
                {
                    users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                        />
                        <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                    })
                }
                </Card>
            </Col>
            <Col onPress={() => this.props.navigation.navigate('Profile')}>
                <Card title="Profile">
                {
                    users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                        />
                        <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                    })
                }
                </Card>
            </Col>
            </Row>
            </Grid>
            </ScrollView>

        );
    }
}

// const ActivityItem = (props) => {
//     return (
//         <View>
//             <View style={styles.activityBox}>
//                 <Text style={styles.activityText}>{props.text1}</Text>
//                 <Text style={styles.activityText1}>{props.text1.length}pts</Text>
//             </View>
//             <Text style={styles.activityText1}>{listOfActivities[props.text1.length % 3]}</Text>
//         </View>
//     );
// };

// const listOfActivities = ["push-ups", "pull-ups", "sit-ups"];

const styles = StyleSheet.create({
    page: {
        //flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 14,
        height: 44,
    },
    activityText: {
        justifyContent: "flex-start",
        paddingLeft: 5,
        paddingRight: 5,
    },
    activityText1: {
        justifyContent: "flex-end",
        color: 'rgba(169,169,169, 1)',
        paddingLeft: 5,
        paddingRight: 5,
    },
    activityBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10
    }
  })

module.exports = HomeScreen;
