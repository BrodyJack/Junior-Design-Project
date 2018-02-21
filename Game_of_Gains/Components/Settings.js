import React from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import SettingsList from 'react-native-settings-list';
import * as firebase from 'firebase';

class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerRight: (
                <Button title="Log Out" onPress={() => {navigation.state.params.doLogout(navigation)}}/>
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ doLogout: this.logout, resetToLanding: this.resetToHome });
    }

    resetToHome = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Landing'})
        ]
    })

    async logout(navigation) {
        try {
            await firebase.auth().signOut();
            console.log('Logged out!');
            navigation.dispatch(navigation.state.params.resetToLanding);
        } catch (error) {
            console.log(error.toString());
        }
    }

    constructor(){
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
      }
      render() {
        var bgColor = '#DCE3F4';
        return (
          <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}} headerText="Account"/>
                <SettingsList.Item
                  icon={
                      <Image style={styles.imageStyle} source={require('./../img/airplane.png')}/>
                  }
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Use Email for Username'
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/blutooth.png')}/>}
                  title='Email Verified'
                  titleInfo='Yes'
                  hasNavArrow={false}
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={() => Alert.alert('Route to Blutooth Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}} headerText="Leaderboard"/>
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/notifications.png')}/>}
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Display as Anonymous'
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/control.png')}/>}
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Public Profile'
                />
                <SettingsList.Header headerStyle={{marginTop:15}} headerText="Social"/>
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/general.png')}/>}
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Hide Account'
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/display.png')}/>}
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Viewable History'
                />
              </SettingsList>
            </View>
          </View>
        );
      }
      onValueChange(value){
        this.setState({switchValue: value});
      }
}

const styles = StyleSheet.create({
    imageStyle:{
      marginLeft:15,
      alignSelf:'center',
      height:30,
      width:30
    },
    titleInfoStyle:{
      fontSize:16,
      color: '#8e8e93'
    }
  });

module.exports = SettingsScreen;
