import React, { Component } from "react"
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, CardItem } from 'native-base'

import Strong from "./../../components/Strong"
import colors from "./../../styles/colors"

class CardComponent extends Component {
  static displayName = "Card"

  onPress = () => {
      this.props.onPress()
  }

  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}>
          <Card>
              <CardItem header>
                  <Strong>{this.props.card.front}</Strong>
              </CardItem>

              <CardItem>
                  <Text>
                      {this.props.card.back}
                  </Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
    )
  }
}

export default CardComponent