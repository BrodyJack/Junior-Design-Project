
import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'

class ChallengesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {label: "All", value: "all"}
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Challenges',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Challenges',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
        }
    };

    render() {
        options = [
            {
                label: 'All',
                value: 'all'
            },
            {
                label: 'Daily',
                value: 'daily'
            },
            {
                label: 'Weekly',
                value: 'weekly'
            },
        ]
        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <SegmentedControls
                        options={ options }
                        onSelection={ setSelectedOption.bind(this) }
                        selectedOption={ this.state.selectedOption }
                        extractText={ (option) => option.label }
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
                        containerStyle={{ marginLeft: 5, marginRight: 5 }}
                    />
                    <SectionList
                        sections={
                            function(state) {
                                if (state.selectedOption.value == "all") {
                                    var returnValues = [];
                                    var names = {};
                                    for (var i = 0; i < challenges.length; i++) {
                                        var currChallenge = challenges[i];
                                        var letterCategory;
                                        letterCategory = currChallenge.name[0];
                                        if (letterCategory in names) {
                                          names[letterCategory].push(currChallenge.name);
                                        } else {
                                          names[letterCategory] = [currChallenge.name];
                                        }
                                    }
                                    var sortedNames = [];
                                    for (var letter in names) {
                                        sortedNames.push(letter);
                                    }
                                    sortedNames.sort();
                                    var sortedDict = {};
                                    for (var index in sortedNames) {
                                        var letter = sortedNames[index]
                                        sortedDict[letter] = names[letter];
                                    }
                                    for (var letter in sortedDict) {
                                        sortedDict[letter].sort();
                                        returnValues.push({title : letter, data: sortedDict[letter]})
                                    }
                                    return returnValues;
                                } else if (state.selectedOption.value == "daily") {
                                    alert("Daily Challenges");
                                    return [];
                                } else if (state.selectedOption.value == "weekly") {
                                    alert("Weekly Challenges");
                                    return [];
                                }
                        }(this.state)}

                        renderItem={({item}) =>
                            <Text
                                style={styles.item}
                                onPress={() => {
                                    alert("You selected " + item);
                                }}>
                                {item}
                            </Text>}
                            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        );
    }
}

challenges = [
        {
            name: "Challenge 1",
        }, {
            name: "Challenge 2",
        }, {
            name: "Challenge 3",
        }, {
            name: "Challenge 4",
        }, {
            name: "Challenge 5",
        }, {
            name: "Challenge 6",
        }, {
            name: "Challenge 7",
        }
    ]
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

module.exports = ChallengesScreen;
