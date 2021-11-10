// Fern's card screen

import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from 'native-base';

import colors from "../../styles/colors";
import {Card} from 'react-native-paper';

class CardScreen extends Component {
    static displayName = "Card"

    onPress = () => {
        this.props.onPress()
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
                    <Card elevation={10} style={{margin: 10, borderRadius: 10, height: 136 }}  onPress = {this.onPress}>
                        <View style={{flex: 1,  margin: 10, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ flex: 0.5, alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                                    Front
                                </Text>
                                <Text style={{fontSize: 14, color: 'grey', textAlign: 'center' }} numberOfLines={5}>
                                    {this.props.card.front}
                                </Text>
                            </View>

                            <View style={{flex: 0.5, alignItems: 'center', borderWidthColor: 'grey', borderLeftWidth: 1 }}>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                                    Back
                                </Text>
                                <Text style={{fontSize: 14, color: 'grey', textAlign: 'center' }} numberOfLines={5}>
                                    {this.props.card.back}
                                </Text>
                            </View>
                            
                        </View>
                    </Card>

        )
    }
}

const styles = StyleSheet.create({
    listItem: { backgroundColor: colors.pink},
})
  
export default CardScreen;