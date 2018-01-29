import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons';

class EventsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {label: "Near", value: "Events Near You"}
        }   
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Events',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
            headerRight: (
                <Button title="+" onPress={() => navigation.navigate('EventCreation')}/>
            )
        }
    };

    render() {

        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }

        return (
            <View style={styles.page}>
                <View style={styles.container}>
                <SegmentedControls
                    options={ options }
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedOption }
                    extractText={ (option) => option.value }
                    testOptionEqual={ (a, b) => {
                        if (!a || !b) {
                            return false;
                        }
                        return a.label === b.label
                    }}                        
                    tint={'#007AFF'}
                    backTint= {'white'}
                    selectedTint= {'white'}
                    selectedBackgroundColor= {'#007AFF'}
                    containerStyle={{ margin: 5 }}
                />
                <SectionList
                  sections={
                      function(state) {
                          if (state.selectedOption.label === "Near") {
                            return [
                                {title: 'Neighborhood Run!', data: ['Created by: Tim Arnold']},
                                {title: 'Spartan Race!', data: ['Created by: Spartan Race, Inc.']},
                            ]
                          } else {
                            return [
                                {title: 'Wander Aimlessly!', data: ['Created by: Brody Johnstone']},
                                {title: 'Pretend to Exercise!', data: ['Created by: Brodie Johnson']},
                            ]
                          }
                      }(this.state)}
                  renderItem={({item, section}) => 
                    <Text 
                        style={styles.item} 
                        onPress={() => this.props.navigation.navigate('EventDetails', { name: section.title, creator: item })}>
                            {item}
                    </Text>}
                  renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>
        );
    }
}

const options = [
    {
        label: 'Near',
        value: 'Events Near You'
    },
    {
        label: 'Owned',
        value: 'Your Events'
    }
]

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