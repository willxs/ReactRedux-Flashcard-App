import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base'

import { connect } from "react-redux"
import { searchAction} from "./../../actions/creators"

class MainFooter extends Component {

  _goToHome = () => {
    this.props.resetSearch()
    this.props.navigation.navigate('Home')
  }

  _goToShare = () => {
    this.props.navigation.navigate('Share')
  }

  _goToStats = () => {
    this.props.navigation.navigate('Stats')
  }

  _goToSettings = () => {
    this.props.navigation.navigate('Settings')
  }

  render() {
    return (
        <Footer>
          <FooterTab>
            <Button onPress = {this._goToHome}>
              <Text>Home</Text>
            </Button>
            <Button onPress = {this._goToShare}>
              <Text>Share</Text>
            </Button>
            <Button onPress = {this._goToStats}>
              <Text>Stats</Text>
            </Button>
            <Button onPress = {this._goToSettings}>
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}

const mapStateToProps = state => {
  return {
      search_term : state.search_term,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      resetSearch: () => {
          dispatch(searchAction(""))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFooter)