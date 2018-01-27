import React from 'react';
import { View, Text, Button, SectionList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SegmentedControls } from 'react-native-radio-buttons'


class LeaderboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {label: "Friends", value: "friends"}
        }   
    }
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
                size={26}
                style={{ color: tintColor }}
            />
            ),
            title: 'Leaderboard',
            headerLeft: (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>
            ),
        }
    };

    render() {
        options = [
            {
                label: 'Friends',
                value: 'friends'
            },
            {
                label: 'Global',
                value: 'global'
            },
        ]
        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
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
                                var list;
                                var titleName;
                                if (state.selectedOption.value == "friends") {
                                    list = friends;
                                    titleName = "Friends Leaderboard";
                                } else if (state.selectedOption.value == "global") {
                                    list = globalBoard;
                                    titleName = "Global Leaderboard";
                                }
                                var returnValues = [];
                                var sortedData = [];
                                var isSorted = [];
                                for (var i = 0; i < list.length; i++) {
                                    isSorted.push(false);
                                }
                                while (sortedData.length != list.length) {
                                    var maxScore = 0;
                                    var idxToAdd = 0;
                                    for (var i = 0; i < list.length; i++) {
                                        if (!isSorted[i] && list[i].score > maxScore) {
                                            maxScore = list[i].score;
                                            idxToAdd = i;
                                        }
                                    }
                                    var toAdd = list[idxToAdd];
                                    sortedData.push(toAdd.firstName + " " + toAdd.lastName + ": " + toAdd.score);
                                    isSorted[idxToAdd] = true;
                                }
                                returnValues.push({title : titleName, data: sortedData})
                                return returnValues;
                            
                            }(this.state)}
                        
                        renderItem={({item}) => 
                            <Text 
                                style={styles.item}
                                onPress={() => {
                                    alert("You selected " + item);
                                }}>
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

friends = [
    {
        firstName: "Brandon",
        lastName: "Manuel",
        score: 10
    }, {
        firstName: "Brody",
        lastName: "Johnstone",
        score: 20
    }, {
        firstName: "Grayson",
        lastName: "Bianco",
        score: 30
    }, {
        firstName: "Jessica",
        lastName: "Chen",
        score: 40
    }, {
        firstName: "Will",
        lastName: "Stith",
        score: 50
    }, {
        firstName: "Bob",
        lastName: "Smith",
        score: 60
    }, {
        firstName: "Brodie",
        lastName: "Johnson",
        score: 70
    }
]

globalBoard = [
    {
        firstName: "Saitama",
        lastName: "",
        score: 1000000
    }, {
        firstName: "Goku",
        lastName: "",
        score: 9001
    }, {
        firstName: "Super",
        lastName: "Man",
        score: 1000
    }, {
        firstName: "Buff",
        lastName: "Guy",
        score: 100
    }, {
        firstName: "Wimpy",
        lastName: "Guy",
        score: 20
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

module.exports = LeaderboardScreen;