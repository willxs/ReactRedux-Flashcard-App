import React, { Component } from "react";
import {View, Button, Platform, Text, TouchableOpacity} from 'react-native';

import { Container, Content } from "native-base"

import TitleHeader from "../../components/TitleHeader"
import MainFooter from "../../components/MainFooter"
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import {Picker} from '@react-native-picker/picker';

import NotifService from '../../../notificationService';

export default class SettingScreen extends Component {
    static displayName = "Settings Screen"

    constructor(props){
        super(props)
        this.state = {
            time: new Date().getTime,
            mode: 'date',
            show: true,
            repeat: 'day',
            notificationTime: 2 // seconds
        }
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
          );
    
        
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        alert(notif.title, notif.message);
      }

    onChange = (event, selectedTime) => {
        var notifyTime = (selectedTime.getHours() * 3600) + (selectedTime.getMinutes() * 60)
       
        this.setState({
            time: selectedTime,
            notificationTime: notifyTime
        })
    }
  
  
     showDatepicker = () => {
        this.setState(
            {
                mode: 'date'
            }
        )
    };
  
     showTimepicker = () => {
        this.setState(
            {
                mode: 'time'
            }
        )
    };

    TimePicker = () => {
        return (
    <View style={{alignItems: 'center'}}>
        <Picker
        selectedValue={this.state.notificationTime}
        style={{height: '30%', width: '100%'}}
        onValueChange={(itemValue, itemIndex) => {

            this.setState({notificationTime: itemValue})
        }
        }>
            <Picker.Item label="1 sec" value={1} />
            <Picker.Item label="5 sec" value={5} />
            <Picker.Item label="1 minute" value={60} />
            <Picker.Item label="1 hour" value={3600} />
            <Picker.Item label="24 hours" value={3600 * 24} />
        </Picker>
        </View>
        )
    }

    render() {
        return (
            <Container>
                <TitleHeader title={SettingScreen.displayName} goBack={this.props.navigation.goBack}/>
                <View>
                    <Text style={
                        {
                            marginTop: 20,
                            color: 'blue', 
                            fontSize: 18,
                            textAlign: 'center'
                        }}
                    >
                        Set Notification Time
                    </Text>
                    {this.TimePicker()}

                         <View>
                    </View>

                </View>
                <TouchableOpacity onPress={() => this.notif.scheduleNotif(this.state.notificationTime)}>
                    <View style={{
                        alignSelf: 'center', 
                        justifyContent: 'center',
                        height: 60, 
                        width: '60%', 
                        backgroundColor: 'cyan',
                        borderRadius: 20
                        
                    }}>
                        <Text style={{alignSelf: 'center', fontSize: 15}}>
                            Click To Set Study Notification
                        </Text>
                    </View>
                </TouchableOpacity>
               

                {/* Main footer is not needed, using React-Navigation Tabbar */}
                {/* <MainFooter navigation={this.props.navigation}/> */}
            </Container>
        )
    }
}