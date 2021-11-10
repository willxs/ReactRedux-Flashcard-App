import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigator from './utilities/Navigator'

import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducers/index'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { readDecks } from "./utilities/storage/decks"
import { loadDataAction } from "./actions/creators"
import NotificationService from './notificationService'

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const store = createStore(reducer, applyMiddleware(thunk))

// On application start, read saved state from disk.
readDecks().then(decks => {
  console.log("loading data")
  store.dispatch(loadDataAction(decks));
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }

    this.notif = new NotificationService(
      this.onRegister.bind(this),
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}
