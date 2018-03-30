import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import * as firebase from 'firebase';
import { ImagePicker } from 'expo'
import b64 from 'base64-js'


async function takeAndUploadPhotoAsync() {
    const result = await ImagePicker.launchImageLibraryAsync({
        base64: true
    })
    const byteArray = b64.toByteArray(result.base64)
    const metadata = {contentType: 'image/jpg'};
    firebase.storage().ref('/profilePictures').child(firebase.auth().currentUser.uid + '.jpg').put(byteArray, metadata).then(snapshot => {
       console.log("uploaded image!")
    })
}

class ProfileScreen extends React.Component {

    componentDidMount() {
        this.listenForEvents('user', this.userRef);
        this.listenForEvents('history', this.historyRef);
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Profile',
        }
    }

    constructor(props) {
        super(props);
        this.userRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/');
        this.historyRef = firebase.database().ref('history/' + firebase.auth().currentUser.uid + '/');
        this.state = {
            currentUserObj: {
                displayName: '',
                exerciseInfo: {
                    pointsAllTime: '',
                    pointsToday: '',
                    pointsWeek: ''
                }
            },
            historyObj: {
                alltime: ''
            }
        };
        this.getHistory = function() {
            mostRecent = [];
            if (this.state.historyObj != null) {
                timeStamps = Object.keys(this.state.historyObj.alltime);
                timeStamps.sort(function(a, b) {
                    return (parseInt(b) - parseInt(a));
                });
                for (var i = 0; i < timeStamps.length; i++) {
                    curr = String(timeStamps[i]);
                    mostRecent.push(this.state.historyObj.alltime[curr]);
                };
                mostRecent = mostRecent.splice(0, 5);
            }
        };
    }

    listenForEvents(type, ref) {
        if (type == 'user') {
            ref.once('value', (snap) => {
                this.setState({
                    currentUserObj: snap.val()
                });
            });
        } else if (type == 'history') {
            ref.once('value', (snap) => {
                this.setState({
                    historyObj: snap.val()
                });
            });
        }
    }

    render() {
        return (
            <ScrollView>
            <Card containerStyle={{padding: 0}}>
                    {/*// implemented without image with header*/}
                    {// <Card title= {this.state.currentUserObj.displayName}>
                    // {
                    //     users.map((u, i) => {
                    //     return (
                    //         <View key={i} style={styles.user}>
                    //         <Image
                    //             style={styles.image}
                    //             resizeMode="cover"
                    //             source={{ uri: u.avatar }}
                    //         />
                    //         <Text style={styles.name}>{u.name}</Text>
                    //         </View>
                    //     );
                    //     })
                    // }
                    // </Card>
                }
                <ListItem
                    title={this.state.currentUserObj.displayName}
                    titleStyle={{fontWeight: 'bold', fontSize:20}}
                    subtitle={"Username"}
                    subtitleStyle={{fontSize: 18}}
                    onPress={() => console.log('attach something useful')}
                    hideChevron
                />
                <ListItem
                    title={
                    <View>
                        <Image 
                            source={require('../img/user.png')}
                            style={styles.profilePicture}
                        />
                    </View>
                    }
                    subtitle="Profile Picture"
                    onPress={() => takeAndUploadPhotoAsync()}
                    hideChevron
                />
                <ListItem
                    title={this.state.currentUserObj.exerciseInfo.pointsAllTime}
                    titleStyle={{fontWeight: 'bold', fontSize:18}}
                    subtitle={"Total Points"}
                    subtitleStyle={{fontSize: 16}}
                    onPress={() => console.log('attach something useful')}
                    hideChevron
                />
                {
                    this.getHistory()
                }
                </Card>
                <Card>
                <Text style={{fontSize: 20}}>
                    Recent history
                </Text>
                {
                    mostRecent.length > 0 
                        ? 
                        mostRecent.map((u, i) => {
                            return (
                                <ListItem
                                key={i}
                                roundAvatar
                                title={u.name}
                                subtitle={u.reps + ' reps'}
                                hideChevron
                                />
                            );
                            })
                        : 
                        <ListItem 
                            title={"No recent exercises"}
                            hideChevron
                        />
                }
                </Card>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: 'rgba(47, 76, 112, 1)',
        flex: 1
    },
    profilePicture: {
        height: 200,
        width: 200
    }
});

module.exports = ProfileScreen;
