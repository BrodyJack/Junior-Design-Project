import React from 'react';
import { View, Text, Button, SectionList, StyleSheet, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import { SearchBar } from 'react-native-elements';

class AddFriendScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create Event'
        }
    };

    render() {
        return (
            <View style={styles.page}>
                <SearchBar
                    lightTheme
                    onChangeText={(text) => this.setState({search: text})}
                />
                <Text style={{textAlign: 'center', paddingTop: 50}}>{this.state.search}</Text>
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

module.exports = AddFriendScreen;