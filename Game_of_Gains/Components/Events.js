import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

class EventsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
            name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
            size={26}
            style={{ color: tintColor }}
        />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, marginLeft: 7, marginRight: 7 }}>
                <NavigationBar
                    title= {{ title: "Events" }}
                    leftButton={{ title: "Settings", handler: () => alert('Settings') }}
                    rightButton={{ title: "Make Event", handler: () => alert('Event Creation') }}
                    tintColor='rgba(247,247,247,1.0)'
                />
                <View style={styles.container}>
                <SectionList
                  sections={[
                    {title: 'Neighborhood Run!', data: ['Created by: Tim Arnold']},
                    {title: 'Spartan Race!', data: ['Created by: Spartan Race, Inc.']},
                  ]}
                  renderItem={({item}) => <Text style={styles.item} onPress={() => alert('Event Details')}>{item}</Text>}
                  renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 14,
      height: 44,
    },
  })

module.exports = EventsScreen;