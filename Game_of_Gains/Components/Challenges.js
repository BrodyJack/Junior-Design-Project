
import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'
import * as firebase from 'firebase';

class ChallengesScreen extends React.Component {

  componentDidMount() {
      this.listenForChallenges(this.itemsRef);
      this.listenForUsers(this.infoRef);
  }
  constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref('challenges/');
        this.infoRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid); //firebase.auth().currentUser.uid
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

    listenForChallenges(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push(child);
            });

            this.setState({
                dataSource: items
            });

        });
    }

    listenForUsers(infoRef) {
        infoRef.on('value', (snap) => {
            var info = [];
            snap.forEach((child) => {
                info.push(child);
            });

            this.setState({
                userSource: info
            });
        });
    }

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
            <View style={styles.page}>
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
                            var returnValues = [];
                            var names = {};
                            if (state.dataSource != null) {
                              state.dataSource.forEach((item) => {
                                if ((item.val().challengeType == state.selectedOption.value) || ("all" == state.selectedOption.value)) {
                                    var letterCategory = item.val().challengeName[0];
                                    if (letterCategory in names) {
                                      names[letterCategory].push(item.val());
                                    } else {
                                      names[letterCategory] = [item.val()];
                                    }
                                }
                              });
                            } else {
                                // Hope this never happens
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
                        }(this.state)}
                    renderItem={({item, section}) =>
                      <Text
                          style={styles.item}
                            onPress={() => {
                                alert("Challenge View!");
                            }}>
                            {item.challengeName}
                      </Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                  />
                </View>
            </View>
        );
    }
}

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

module.exports = ChallengesScreen;
