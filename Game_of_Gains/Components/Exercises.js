import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button, List } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
            <ScrollView>
            <Grid>
                <Row>
                <Col>
                    {/*// implemented without image with header*/}
                    <Card title="Quick Picks" style={styles.quickPick}>
                    {
                        <Grid>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Push-Up', reps: 10, type: 'cardio', weight: null})}>
                                <Card>
                                    <Text style={styles.cardText}>Push-Up</Text>
                                    <Text style={styles.cardText1}>10 Reps</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Pull-Up', reps: 15, type: 'lifting', weight: null})}>
                                <Card>
                                    <Text style={styles.cardText}>Pull-Up</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Sit-Up', reps: 15, type: 'cardio', weight: null})}>
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
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Elliptical', reps: 15, type: 'cardio', weight: 150})}>
                                <Card>
                                    <Text style={styles.cardText}>Elliptical</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
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
                    {/*// implemented without image without header, using ListItem component*/}
                    <Card title="Exercise List">
                        <FlatList
                            data={this.state.exercises}
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
            </ScrollView>

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
    }
});

module.exports = ExercisesScreen;
