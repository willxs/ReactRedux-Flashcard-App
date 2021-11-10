import React, { Component } from "react";
import { StyleSheet } from "react-native"
import { Container, Content, H1, Root, Card, Body, Icon, Text } from "native-base"

import SearchHeader from './../../components/SearchHeader'
import AddButton from './../../components/AddButton'
import Deck from './Deck'
import RecentDeck from './RecentDeck'
import MainFooter from "../../components/MainFooter"

import { connect } from "react-redux"
import { searchAction, deleteDeckAction} from "./../../../actions/creators"
import { Col, Row, Grid } from 'react-native-easy-grid';
import colors from "../../styles/colors";
import { uploadFireBase, downloadFireBase } from "./../../../reducers/DeckReducer"

import DeckList from "./DeckList"

import { Alert, Clipboard  } from "react-native"

//Below import should be used but not supposed in Expo SDK
//import Clipboard from '@react-native-community/clipboard'


class HomeScreen extends Component {
    static displayName = "Home"

    _createRecentDeckView() {
        if (!this.props.decks || this.props.decks.length === 0) {
            return <Body>
                        <Icon name="sad-tear" type="FontAwesome5"/>
                        <Text>You have no decks...</Text>
                    </Body>
        }
        // create recent decks
        if (this.props.decks.length > 3) {
            // ni
            // sorting will be delegated at a higher level
            let mostRecentDecks = this.props.decks.slice(0, 4);
            return (
                <Grid>
                    <Row>
                        <H1>Recent Decks</H1>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                {/* Change for ShareDeckTesting */}
                                <RecentDeck deck={mostRecentDecks[0]} onPress={() => {this._viewDeck(mostRecentDecks[0].id)}} />
                            </Row>
                            <Row>
                                <RecentDeck deck={mostRecentDecks[2]} onPress={() => {this._viewDeck(mostRecentDecks[2].id)}}/>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <RecentDeck deck={mostRecentDecks[1]} onPress={() => {this._viewDeck(mostRecentDecks[1].id)}}/>
                            </Row>
                            <Row>
                                <RecentDeck deck={mostRecentDecks[3]} onPress={() => {this._viewDeck(mostRecentDecks[3].id)}}/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            )
        }
        return null
    }

    _createDeckViews() {
        if (!this.props.decks) {
            return null
        }
        
       return <DeckList decks={this.props.decks} onPress = {this._viewDeck} onShare = {this._shareDeck} onDelete = {this._deleteDeck} style={{flex: 1}}/>
    }

    _addDeck = () => {
        //console.log(this.props.decks[0].cards.length)
        this.props.navigation.navigate("New Deck")
    }

    _deleteDeck = (deck) => {
        this.props.deleteDeck(deck)
    }

    _onSearch = (title) => {
        this.props.searchDeck(title)
    }

    _shareDeck = (deck) => {
        this.props.uploadDeck(uploadFireBase(deck))
        Alert.alert(
            "Shareable ID",
            "Use the following on the share page to add someone elses's deck: \n\n" + deck.id,
            [
              {
                text: "Copy message",
                onPress: () => this.copyToClipboard(deck),
                style: "cancel"
              },
              { text: "Close"
            }
            ],
            { cancelable: true }
        );
    }

    copyToClipboard = (deck) => {
        Clipboard.setString(deck.id.toString())
    };

    _viewDeck = (id) => {
        console.log(id)
        this.props.navigation.navigate("View Deck", {deckID : id})
    }

    render() {
        return (
            <Container>
                <SearchHeader onSearch = {this._onSearch}/>
                <Root>
                    <Content padder>
                        {this._createRecentDeckView()}
                        {this._createDeckViews()}
                    </Content>
                    <AddButton onPress={this._addDeck} />
                </Root>
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        );
    }
}

// get search results here
const getDeckResults = (decks, term) => {
    if (term === "" || term === undefined) {
        return decks
    }
    return decks.filter(deck => deck.title.toLowerCase().includes(term.toLowerCase()))
}

const getRecentDecks = (decks) => {
    console.log("recent decks")
}

const mapStateToProps = state => {
    return {
        search_term : state.search_term,
        decks : getDeckResults(state.decks, state.search_term),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchDeck: (title) => {
            dispatch(searchAction(title))
        },
        deleteDeck: (deck) => {
            dispatch(deleteDeckAction(deck))
        },
        uploadDeck: (uploadFireBase_Function) => {
            dispatch(uploadFireBase_Function)
        },
        downloadDeck: (downloadFireBase_Function) => {
            dispatch(downloadFireBase_Function)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)