import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';

class NotificationsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Notifications',
        }
    }

    constructor(props) {
        super(props);
    }

    render() {

        const users = [
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brody',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }
           ];

        return (
            <ScrollView>
            <Grid>
                <Row>
                <Col onPress={() => console.log('attach something useful')}>
                    {/*// implemented without image with header*/}
                    <Card title="CARD WITH DIVIDER">
                    {
                        users.map((u, i) => {
                        return (
                            <View key={i} style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: u.avatar }}
                            />
                            <Text style={styles.name}>{u.name}</Text>
                            </View>
                        );
                        })
                    }
                    </Card>
                </Col>
                </Row>

                <Row>
                <Col>
                    {/*// implemented without image without header, using ListItem component*/}
                    <Card containerStyle={{padding: 0}}>
                    {
                        users.map((u, i) => {
                        return (
                            <ListItem
                            key={i}
                            roundAvatar
                            title={u.name}
                            avatar={{uri:u.avatar}}
                            onPress={() => console.log(u.name)}
                            />
                        );
                        })
                    }
                    </Card>
                </Col>
                </Row>

                <Row>
                <Col onPress={() => console.log('attach something useful')}>
                     {/*// implemented with Text and Button as children*/}
                    <Card
                    title='HELLO WORLD'
                    image={require('./../img/user.png')}>
                    <Text style={{marginBottom: 10}}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VIEW NOW' />
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
    }
});

module.exports = NotificationsScreen;
