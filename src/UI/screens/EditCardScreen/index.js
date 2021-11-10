import React, { Component } from "react"
import { Container, Content, Form, Label, Item, Input, Button, Text } from "native-base"
import { StyleSheet } from 'react-native'
import TitleHeader from "./../../components/TitleHeader"
import MainFooter from "./../../components/MainFooter"
import { connect } from 'react-redux'
import { editCardAction } from "./../../../actions/creators"

class EditCardScreen extends Component{
    static displayName = "Edit Card";

    _handleFront = (newFront) => {
        this.props.changeCard.front = newFront;
    }

    _handleBack = (newBack) => {
        this.props.changeCard.back = newBack;
    }

    _editCard = () => {
        this.props.editCard(this.props.currentCard, this.props.changeCard, this.props.currentCard.deckID, this.props.currentCard.cardID);
        this.props.navigation.navigate("Card");
    }

    render(){
        return (
            <Container>
                <TitleHeader style={styles.contentStyle} title={EditCardScreen.displayName} goBack={this.props.navigation.goBack}/>
                <Content>
                    <Form>
                        <Item stackedLabel>
                        <Label>Question</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleFront}
                            placeholder={this.props.currentCard.front}
                        />
                        </Item>

                        <Item stackedLabel last>
                        <Label>Answer</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleBack}
                            placeholder={this.props.currentCard.back}
                        />
                        </Item>
                    </Form>

                    <Button block onPress={this._editCard}>
                        <Text>Save</Text>
                    </Button>
                </Content>
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const getOldCard = (decks, deckID, cardID) => {
    let deck = decks.find((deck) => {return deck.id === deckID});
    return deck.cards.find(card => card.cardID === cardID);
}

const mapStateToProps = (state, ownProps) => {
    return {
        decks : state.decks,
        currentCard: getOldCard(state.decks, ownProps.route.params.card.deckID, ownProps.route.params.card.cardID),
        //The card that will be changed to a new card to update state
        changeCard: getOldCard(state.decks, ownProps.route.params.card.deckID, ownProps.route.params.card.cardID)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editCard: (oldCard, newCard, deckID, cardID) => {
            dispatch(editCardAction(oldCard, newCard, deckID, cardID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCardScreen)