import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, Image, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

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
                <Button title="Log" onPress={() => navigation.navigate('Home')}/>
            )
        }
    };


    render() {
        return (
            <View style={styles.page}>

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
    page: {
        flex: 1,
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
