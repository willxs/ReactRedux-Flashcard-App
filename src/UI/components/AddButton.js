import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Fab, Icon } from 'native-base';

import colors from "./../styles/colors"
// trying out a pure functional component instead of a class (remember comp 3007?)
const AddButton = (props) => (
  <View style={{ flex: 0.01}}>
    <Fab
        active={false}
        style={[styles.fab, props.style]}
        position="bottomRight"
        onPress={props.onPress}
    >
      <Icon name="add" />
    </Fab>
  </View>
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.pink2
  },
})

export default AddButton