import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

import colors from "../styles/colors"
// trying out a pure functional component instead of a class
const StudyButton = (props) => (
  <View style={{ flex: 0.001 }}>
    <Button
        style={[styles.fab, props.style]}
        position="absolute"
        onPress={props.onPress}
    >
    <Text>Study</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.greenright,
    bottom: 20,                             
    left: 10,
    borderRadius: 30,
  },
})

export default StudyButton