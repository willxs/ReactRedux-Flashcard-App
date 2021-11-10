import React, { Component } from "react"
import { Container, Content } from "native-base"

import TitleHeader from "../../components/TitleHeader"
import MainFooter from "../../components/MainFooter"

import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { Button, Text } from 'native-base'
import StudyCard from './StudyCard'
import colors from '../../styles/colors'

import { connect } from 'react-redux'
import { nextCardAction, replaceCardInDeckAction, endStudyAction } from "../../../actions/creators"
import { Title } from "react-native-paper";
import CompletionView from "./CompletionView";

class StudyScreen extends Component {
    static displayName = "Study"

    _recordResponse = (response) => {
        this.props.nextCard(response)
        this.props.modifyCard(this.props.currentCard, response)
    }

    _infoPress = () => {
        alert(
        `5: perfect response\n
        4: correct response after a hesitation\n
        3: correct response recalled with serious difficulty\n
        2: incorrect response; where the correct one seemed easy to recall\n
        1: incorrect response; the correct one remembered\n
        0: complete blackout.`
        )
    }

    render() {
        if (!this.props.currentCard) {
            return (
            <Container>
                <TitleHeader title={StudyScreen.displayName} goBack={this.props.navigation.goBack} iconPressed={this._infoPress} />
                <Content style={{ flex: 1, backgroundColor : colors.blue }} contentContainerStyle={{ flexGrow: 1 }}>
                    <CompletionView/>
                </Content>
                <MainFooter navigation={this.props.navigation} />
            </Container>
            )
        }
        return (
            <Container>
                <TitleHeader title={StudyScreen.displayName} goBack={this.props.navigation.goBack} iconPressed={this._infoPress} />
                <Content style={{ flex: 1, backgroundColor : colors.blue }} contentContainerStyle={{ flexGrow: 1 }}>
                    <StudyCard front = {this.props.currentCard.front} back = {this.props.currentCard.back} />
                    <View style={styles.buttonRow}>
                        <Button block style={[styles.button, {backgroundColor : colors.redwrong}]} onPress={() => this._recordResponse(0)}>
                            <Text>0</Text>
                        </Button>

                        <Button block style={[styles.button, {backgroundColor : colors.orangered}]} onPress={() => this._recordResponse(1)}>
                            <Text>1</Text>
                        </Button>

                        <Button block style={[styles.button, {backgroundColor : colors.orange}]} onPress={() => this._recordResponse(2)}>
                            <Text>2</Text>
                        </Button>

                        <Button block style={[styles.button, {backgroundColor : colors.yellowprogress}]} onPress={() => this._recordResponse(3)}>
                            <Text>3</Text>
                        </Button>
                        
                        <Button block style={[styles.button, {backgroundColor : colors.green}]} onPress={() => this._recordResponse(4)}>
                            <Text>4</Text>
                        </Button>

                        <Button block style={[styles.button, {backgroundColor : colors.greenright}]} onPress={() => this._recordResponse(5)}>
                            <Text>5</Text>
                        </Button>
                    </View>
                </Content>
                <MainFooter navigation={this.props.navigation} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonRow: { 
        padding: 15, 
        flexDirection: "row" 
    },

    button: {
        flex: 1,
    }
})

const mapStateToProps = (state) => {
    return {
        //currentDeck : state.decks.find(deck => deck.id === ownProps.route.params.deckID)
        currentCard : state.currentStudy.studyQueue.peek() // studyqueue is just a copy, not actual cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextCard: (response) => {
            dispatch(nextCardAction(response))
        },

        modifyCard: (card, response) => {
            dispatch(replaceCardInDeckAction(card))
        },

        endStudy: (response) => {
            dispatch(endStudyAction(response))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyScreen)
