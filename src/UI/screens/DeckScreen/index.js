import React, { Component } from "react"
import { Button, Container, Header, Content , Text, Divider, View, H1, Body, Icon} from "native-base"

import SearchHeader from './../../components/SearchHeader'
import AddButton from "./../../components/AddButton"
//import StudyButton from "./../../components/StudyButton"

// Ahmed's card component
import CardComponent from './CardComponent'
// Fern's card component
import CardView from './CardScreen'

import { connect } from "react-redux"
import { searchAction, createStudyAction } from "./../../../actions/creators"
import MainFooter from "../../components/MainFooter"
import StudyButton from "../../components/StudyButton"

class DeckScreen extends Component {
    static displayName = "View Deck"
    // reset search state when going back.
    _goBack = () => {
        this._onSearch("")
        this.props.navigation.goBack()
    }

    _addCard = () => {
        this.props.navigation.navigate("New Card", {'deckID' : this.props.route.params.deckID})
    }

    _viewCard = (cardID) => {
        this.props.navigation.navigate("Card", {'card' : this._findCard(cardID)});
    }

    _study = () => {
        this.props.startStudy(this.props.route.params.deckID)
        this.props.navigation.navigate("Study", {'deckID' : this.props.route.params.deckID})
    }

    _onSearch = (title) => {
        this.props.searchCard(title)
    }

    _createCardViews() {
        if (this.props.cardResults.length === 0) {
            return <Body>
                        <Text>No cards available.</Text>
                    </Body>
        }
        return this.props.cardResults.map(card => {
            return <CardView card={card} key={card.cardID} onPress={() => {this._viewCard(card.cardID)}} />
        })
    }

    _findDeck() {
        return this.props.decks.find((deck) => {return (deck.id === this.props.route.params.deckID)});
    }

    _findCard(cardID){
        let deck = this.props.decks.find((deck) => {return (deck.id === this.props.route.params.deckID)});
        let card = deck.cards.find((card) => {return card.cardID === cardID});
        return card;
    }

    render() {
        return (
            <Container>
                <SearchHeader title="Temp" onSearch={this._onSearch} canGoBack={this.props.navigation.canGoBack} goBack={this._goBack} />
                <Content>
                    <H1>{this._findDeck().title}</H1>
                    {this._createCardViews()}
                </Content>
                <AddButton onPress={this._addCard} />

                <StudyButton onPress={this._study} />
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        )
    }
}

const getFilteredCards = (decks, term, deckID) => {
    let deck = decks.find((deck) => {return deck.id === deckID})
    //console.log("Deck", deck)
    if (term === "" || term === undefined) {
        //console.log(deck.cards)
        return deck.cards
    }
    console.log(deck.cards.filter(card => card.front.includes(term)));
    return deck.cards.filter(card => card.front.includes(term));
}

const mapStateToProps = (state, ownProps) => {
    return {
        decks : state.decks,
        search_term : state.search_term,
        cardResults : getFilteredCards(state.decks, state.search_term, ownProps.route.params.deckID)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createCard: (front, back, deckID) => {
            dispatch(addCardAction(front, back, deckID))
        },
        searchCard: (title) => {
            dispatch(searchAction(title))
        },
        startStudy: (deckID) => {
            dispatch(createStudyAction(deckID))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
