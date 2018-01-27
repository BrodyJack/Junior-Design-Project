import React from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import SettingsList from 'react-native-settings-list';

class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
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
            {/* <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
              <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
            </View> */}
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                  icon={
                      <Image style={styles.imageStyle} source={require('./../img/airplane.png')}/>
                  }
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Airplane Mode'
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/wifi.png')}/>}
                  title='Wi-Fi'
                  titleInfo='Bill Wi The Science Fi'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={() => Alert.alert('Route to Wifi Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/blutooth.png')}/>}
                  title='Blutooth'
                  titleInfo='Off'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={() => Alert.alert('Route to Blutooth Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/cellular.png')}/>}
                  title='Cellular'
                  onPress={() => Alert.alert('Route To Cellular Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/hotspot.png')}/>}
                  title='Personal Hotspot'
                  titleInfo='Off'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={() => Alert.alert('Route To Hotspot Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/notifications.png')}/>}
                  title='Notifications'
                  onPress={() => Alert.alert('Route To Notifications Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/control.png')}/>}
                  title='Control Center'
                  onPress={() => Alert.alert('Route To Control Center Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/dnd.png')}/>}
                  title='Do Not Disturb'
                  onPress={() => Alert.alert('Route To Do Not Disturb Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/general.png')}/>}
                  title='General'
                  onPress={() => Alert.alert('Route To General Page')}
                />
                <SettingsList.Item
                  icon={<Image style={styles.imageStyle} source={require('./../img/display.png')}/>}
                  title='Display & Brightness'
                  onPress={() => Alert.alert('Route To Display Page')}
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