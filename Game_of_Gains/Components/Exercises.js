import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import { Card, ListItem, Button, List, SearchBar } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class ExercisesScreen extends React.Component {

    componentDidMount() {
        this.listenForEvents(this.exerciseRef);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Exercises',
        }
    }

    constructor(props) {
        super(props);
        this.exerciseRef = firebase.database().ref('exercises/');
        this.state = {
            search: "",
            exercises: [],
            currentUserId: firebase.auth().currentUser.uid
        };
    }

    listenForEvents(ref, navigation) {
        ref.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push(child);
            });

            this.setState({
                exercises: items
            });
        });
    }

    render() {

        return (
            <KeyboardAwareScrollView extraScrollHeight={20}>
            <Grid>
                <Row>
                <Col>
                    {/*// implemented without image with header*/}
                    <Card title="Quick Picks" style={styles.quickPick}>
                    {
                        <Grid>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Push-Up', reps: 10, type: 'body', weight: 0})}>
                                <Card>
                                    <Text style={styles.cardText}>Push-Up</Text>
                                    <Text style={styles.cardText1}>10 Reps</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Pull-Up', reps: 15, type: 'body', weight: 0})}>
                                <Card>
                                    <Text style={styles.cardText}>Pull-Up</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Sit-Up', reps: 15, type: 'body', weight: 0})}>
                                <Card>
                                    <Text style={styles.cardText}>Sit-Up</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Bench Press', reps: 15, type: 'lifting', weight: 150})}>
                                <Card>
                                    <Text style={styles.cardText}>Bench Press</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Elliptical', distance: 5, type: 'cardio'})}>
                                <Card>
                                    <Text style={styles.cardText}>Elliptical</Text>
                                    <Text style={styles.cardText1}>5 Miles</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Squats', reps: 15, type: 'lifting', weight: 150})}>
                                <Card>
                                    <Text style={styles.cardText}>Squats</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            </Row>
                        </Grid>
                    }
                    </Card>
                </Col>
                </Row>

                <Row>
                <Col>
                    <Text></Text>
                    <SearchBar
                        lightTheme
                        placeholder="Search for an Exercise"
                        onChangeText={(text) => this.setState({search: text})}
                        round
                        containerStyle={styles.searchbarContainer}
                    />
                    <Text></Text>
                    {/*// implemented without image without header, using ListItem component*/}
                    <Card title="Exercise List">
                        <FlatList
                            data={function(state) {
                                if (state.search == "") {
                                    return state.exercises;
                                }
                                returnExercises = [];
                                exercises = state.exercises;
                                exercises.forEach(function(item) {
                                    if (item.val()["display"].toUpperCase().includes(state.search.toUpperCase().trim())) {
                                        returnExercises.push(item);
                                    }
                                });
                                return returnExercises;
                            }(this.state)}
                            renderItem={({item}) =>
                                <ListItem
                                    title={item.val().display}
                                    onPress={() =>
                                        this.props.navigation.navigate('AddExercise',
                                        {
                                            name: item.val().display,
                                            reps: 15,
                                            type: item.val().type,
                                            weight: 10
                                        })
                                    }
                                />
                            }
                        />
                    </Card>
                </Col>
                </Row>
            </Grid>
        </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    },
    cardText: {
        textAlign: 'center'
    },
    cardText1: {
        textAlign: 'center',
        color: 'gray'
    },
    quickPick: {
        paddingBottom: '50px'
    },
    searchbarContainer: {
        backgroundColor: '#EAE9EF',
        borderTopWidth: 0,
        borderBottomWidth: 0
    }
});

module.exports = ExercisesScreen;
