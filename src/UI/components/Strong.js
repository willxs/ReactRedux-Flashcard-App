import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { Text } from "native-base"

export default class Strong extends Component {
  render() {
    return (
        <Text style={styles.bold}>
            {this.props.children}
        </Text>
    )
  }
}

const styles = StyleSheet.create({
  bold: {
      fontWeight: "bold"
  }
})