import React from 'react';
import { AsyncStorage, View, Text, Button, SectionList, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
import './Global.js';
class HomeScreen extends React.Component {
    // React Navigation? More like extreme aggravation
    // Just ask me
    // - Brody
    constructor(props) {
        super(props);
        this.load = this.load.bind(this);
    }
    componentDidMount() {
        this.load();
        this.props.navigation.setParams({ doLogout: this.logout, resetToLanding: this.resetToHome });
    }

    resetToHome = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Landing'})
        ]
    })

    load() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
                firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                    global.username = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
                });
            } else {
                console.log('fail');
            }
        });
    }

    async logout(navigation) {
        try {
            await firebase.auth().signOut();
            console.log('Logged out!');
            navigation.dispatch(navigation.state.params.resetToLanding);
        } catch (error) {
            console.log(error.toString());
        }
    }

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
                <Button title="Log Out" onPress={() => {navigation.state.params.doLogout(navigation)}}/>
            )
        }
    };

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

        wwidth = Dimensions.get('window').width;

        return (
            /*<View style={styles.page}>

                <Image style={{paddingBottom: 10}} source={require('../user.png')}/>

                <Image style={{paddingBottom: 10}} source={require('../Graph.png')}/>
                <Text>{global.username || ''}</Text>
                <SectionList stickySectionHeadersEnabled={true}
                  sections={[
                    {title: 'Recent Activities', data: ['Brody', 'Grayson', 'Will', 'Brandon', 'Jessica', 'Mary']},
                  ]}
                  renderItem={({item}) => <ActivityItem style={styles.item} text1={item} />}
                  renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                  keyExtractor={(item, index) => index}
                />
            </View>
            */
            <ScrollView>
            <Grid>
            <Row size={25}>
            <Col>
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
            <Col>
                <Card title="Recent Activity">
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
                <Col>
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
            <Col>
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
            <Col>
                <Card title="?">
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

const ActivityItem = (props) => {
    return (
        <View>
            <View style={styles.activityBox}>
                <Text style={styles.activityText}>{props.text1}</Text>
                <Text style={styles.activityText1}>{props.text1.length}pts</Text>
            </View>
            <Text style={styles.activityText1}>{listOfActivities[props.text1.length % 3]}</Text>
        </View>
    );
};

const listOfActivities = ["push-ups", "pull-ups", "sit-ups"];

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
