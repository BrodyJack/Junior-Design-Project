import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class ExercisesScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Exercises',
        }
    }

    constructor(props) {
        super(props);
    }

    render() {

        const users = [
            {
               name: 'Pull-Ups',
               num: '10 Reps'
            },
            {
                name: 'Push-Ups',
                num: '15 Reps'
            },
            {
                name: 'Sit-Ups',
                num: '15 Reps'
            },
            {
                name: 'Bench Press',
                num: '15 Reps'
            }
           ];

        return (
            <ScrollView>
            <Grid>
                <Row>
                <Col>
                    {/*// implemented without image with header*/}
                    <Card title="Quick Picks">
                    {
                        <Grid>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Push-Up', reps: '10', type: 'body', weight: null})}>
                                <Card>
                                    <Text style={styles.cardText}>Push-Up</Text>
                                    <Text style={styles.cardText1}>10 Reps</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Pull-Up', reps: '15', type: 'body', weight: null})}>
                                <Card>
                                    <Text style={styles.cardText}>Pull-Up</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Sit-Up', reps: '15', type: 'body', weight: null})}>
                                <Card>
                                    <Text style={styles.cardText}>Sit-Up</Text>
                                    <Text style={styles.cardText1}>15 Reps</Text>
                                </Card>
                            </Col>
                            <Col onPress={() => this.props.navigation.navigate('AddExercise', {name: 'Bench Press', reps: '15', type: 'weight', weight: '150'})}>
                                <Card>
                                    <Text style={styles.cardText}>Bench Press</Text>
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
                    {
                        users.map((u, i) => {
                        return (
                            <ListItem
                            key={i}
                            title={u.name}
                            onPress={() => console.log(u.name)}
                            rightTitle={u.num}
                            />
                        );
                        })
                    }
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

    }
});

module.exports = ExercisesScreen;
