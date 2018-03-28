import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList, KeyboardAvoidingView, TextInput , Dimensions} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class AddExercise extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Log Exercise',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.state.params.name,
            type: this.props.navigation.state.params.type,
            reps: this.props.navigation.state.params.reps,
            weight: this.props.navigation.state.params.weight
        }
    }

    render() {
        if (this.state.type == 'body') {
            return (
                <Card title={this.state.name}>
                    <Text style={styles.cardText}>Reps</Text>
                    <KeyboardAvoidingView>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.reps}
                            style={styles.editText}
                            onChangeText={(text) => this.setState({reps: text})}
                        />
                    </KeyboardAvoidingView>
                    <Button raised rounded title="Log" backgroundColor='#007aff' marginTop={25}
                        onPress={() => alert("pressed")}/>
                    <Text></Text>
                    <Button raised rounded title="Cancel" backgroundColor='#ff3b30' marginTop={75}
                        onPress={() => this.props.navigation.goBack()}/>
                </Card>
            );
        } else if (this.state.type == 'weight') {
            return (
                <Card title={this.state.name}>
                    <Text style={styles.cardText}>Reps</Text>
                    <KeyboardAvoidingView>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.reps}
                            style={styles.editText}
                            onChangeText={(text) => this.setState({reps: text})}
                        />
                        <Text style={styles.cardText}>Weight</Text>
                        <TextInput
                            keyboardType="numeric"
                            defaultValue={this.state.weight}
                            style={styles.editText}
                            onChangeText={(text) => this.setState({weight: text})}
                        />
                    </KeyboardAvoidingView>
                    <Button raised rounded title="Log" backgroundColor='#007aff' marginTop={25} marginBottom={25}
                        onPress={() => alert(this.state.weight + ", " + this.state.name)}/>
                    <Text></Text>
                    <Button raised rounded title="Cancel" backgroundColor='#ff3b30' marginTop={75}
                        onPress={() => this.props.navigation.goBack()}/>
                </Card>
            );
        }
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16
    },
    editText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        width: Dimensions.get('window').width - 80,
        height: 35,
        backgroundColor: 'white',
        marginBottom: 20,
        textAlign: 'center',
        alignSelf:'center'
    },
    quickPick: {

    }
});
module.exports = AddExercise;
