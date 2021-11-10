import React, { Component } from "react"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, CardItem, Body, H1 } from 'native-base'

export default class CompletionView extends Component {
    
    render() {
        return (

            <Card style={[styles.container]}>
                    <CardItem header bordered style={{justifyContent: 'center', alignItems: 'center'}}>
                        <H1>Congrats!</H1>
                    </CardItem>
                    <Body>
                        <Text>
                            You have completed this study.
                        </Text>
                    </Body>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    card: {
        flex: 1,
    }
})