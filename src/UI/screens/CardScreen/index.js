import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Text } from "native-base"
import { TouchableOpacity } from 'react-native-gesture-handler'

import TitleHeader from "./../../components/TitleHeader"
import MainFooter from "./../../components/MainFooter"
import StudyCard from "./../StudyScreen/StudyCard"

import { connect } from 'react-redux'
import { deleteCardInDeckAction } from "./../../../actions/creators"

import colors from "./../../styles/colors"

class CardScreen extends Component{
    static displayName = "Card";

    _onDeletePressed = () => {
        this.props.deleteCard(this.props.currentCard.cardID, this.props.currentCard.deckID)
        this.props.navigation.navigate("View Deck", {deckID : this.props.currentCard.deckID})
    }

    _onEditPressed = () => {
        this.props.navigation.navigate("Edit Card", {card: this.props.route.params.card});
    }

    render() {
        if (!this.props.currentCard) {
            return null
        }
        return (
            <Container>
                <TitleHeader title={CardScreen.displayName} goBack={this.props.navigation.goBack}/>
                <Content style={{ flex: 1, backgroundColor : colors.blue }} contentContainerStyle={{ flexGrow: 1 }}>         
                    <StudyCard front = {this.props.currentCard.front} back = {this.props.currentCard.back} />

                    <View style={styles.buttonRow}>
                        <Button icon block style={[styles.button, {backgroundColor : colors.greenright}]} onPress={this._onEditPressed}>
                            <Icon name="edit" type="MaterialIcons"/>
                            <Text>Edit</Text>
                        </Button>
                        <Button icon block style={[styles.button, {backgroundColor : colors.redwrong}]} onPress={this._onDeletePressed}>
                            <Icon name="delete" type="MaterialIcons"/>
                            <Text>Delete</Text>
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

const getCurrentCard = (decks, deckID, cardID) => {
    let deck = decks.find((deck) => {return deck.id === deckID});
    return deck.cards.find(card => card.cardID === cardID);
}

const mapStateToProps = (state, ownProps) => {
    return {
        decks : state.decks,
        currentCard: getCurrentCard(state.decks, ownProps.route.params.card.deckID, ownProps.route.params.card.cardID)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCard: (cardID, deckID) => {
            dispatch(deleteCardInDeckAction(cardID, deckID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen)