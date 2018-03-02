import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SquareGrid from "react-native-square-grid";
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
                <Col onPress={() => console.log('attach something useful')}>
                    {/*// implemented without image with header*/}
                    <Card title="Quick Picks">
                    {
                        <Grid>
                            <Row>
                            <Col>
                                <Card>
                                    <Text style={styles.cardText}>Push-Up</Text>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Text style={styles.cardText}>Pull-Up</Text>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                                <Card>
                                    <Text style={styles.cardText}>Sit-Up</Text>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Text style={styles.cardText}>Bench Press</Text>
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
    quickPick: {

    }
});

module.exports = ExercisesScreen;
