import React, { Component } from "react"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, CardItem, Body } from 'native-base'

export default class StudyCard extends Component {
    // we can use state here because it only is for the user to see answers (doesn't affect cards)
    static initialState = { showAnswer: false }
    
    constructor(props) {
        super(props)
        this.state = StudyCard.initialState
    }

    toggleAnswer = () => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.toggleAnswer} style={styles.container}>
                <Card style={styles.card}>
                        <CardItem header bordered style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{this.state.showAnswer ? "Answer" : "Question" }</Text>
                        </CardItem>
                        <Body style={{paddingTop : 15}}>
                            <Text>
                                {this.state.showAnswer ? this.props.back : this.props.front }
                            </Text>
                        </Body>
                </Card>
            </TouchableOpacity>
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