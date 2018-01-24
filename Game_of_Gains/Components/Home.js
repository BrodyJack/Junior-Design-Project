import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, Image, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class HomeScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-person' : 'ios-calendar-outline'}
                size={26}
                style={{ color: tintColor }}
            />
        ),
    };


    render() {
        return (
            <View style={{ flex: 1, marginLeft: 7, marginRight: 7 }}>
                <NavigationBar
                    title= {{ title: "Game Of Gains" }}
                    leftButton={{ title: "Settings", handler: () => alert('Settings') }}
                    rightButton={{ title: "Log Workout", handler: () => alert('Log Workout') }}
                    tintColor='rgba(247,247,247,1.0)'
                />

                <Image style={{paddingBottom: 10}} source={require('../user.png')}/>

                <Image style={{paddingBottom: 10}} source={require('../Graph.png')}/>

                <SectionList stickySectionHeadersEnabled={true}
                  sections={[
                    {title: 'Recent Activities', data: ['Brody', 'Grayson', 'Will', 'Brandon', 'Jessica', 'Mary']},
                  ]}
                  renderItem={({item}) => <ActivityItem style={styles.item} text1={item} />}
                  renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                  keyExtractor={(item, index) => index}
                />
            </View>
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
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 0,
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
    },
    activityText1: {
        justifyContent: "flex-end",
        color: 'rgba(169,169,169, 1)'
    },
    activityBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10
    }
  })

module.exports = HomeScreen;
