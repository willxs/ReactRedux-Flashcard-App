import React, { Component } from "react";
import { StyleSheet } from "react-native"
import { Container, Content, H1, Root, Form, Label, Item, Input, Button, Text, Icon  } from "native-base"

import SearchHeader from './../../components/SearchHeader'
import AddButton from './../../components/AddButton'
import Deck from '../HomeScreen/Deck'
import MainFooter from "../../components/MainFooter"

import { connect } from "react-redux"
import { searchAction, deleteDeckAction} from "./../../../actions/creators"
import { Col, Row, Grid } from 'react-native-easy-grid';
import colors from "../../styles/colors";

import { Alert,Clipboard  } from "react-native"

import DeckList from "../HomeScreen/DeckList"

import { uploadFireBase, downloadFireBase } from "./../../../reducers/DeckReducer"

class ShareScreen extends Component {
    static displayName = "Share"

    _createDeckViews() {
        if (!this.props.decks) {
            return null
        }
        
       return <DeckList decks={this.props.decks.filter(deck => deck.synced === true)} onPress = {this._viewDeck} onShare = {this._shareDeck} onDelete = {this._deleteDeck} style={{flex: 1}}/>
    }

    // reset search state when going back.
    _goBack = () => {
        this._onSearch("")
        this.props.navigation.goBack()
    }
    
    _onSearch = (title) => {
        this.props.searchDeck(title)
    }

    _deleteDeck = (deck) => {
        this.props.deleteDeck(deck)
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
        this.props.navigation.navigate("View Deck", {deckID : id})
    }

    _handleInput = text => {
        this.setState({ shareId: text })
    }

    _getDeck = () => {
        if (this.state === null || this.state.shareId === "" ) {
            alert("Empty field")
            return
        }

        this.props.downloadDeck(downloadFireBase(this.state.shareId.trim()))

        Alert.alert(
            "Download Deck in Progress",
            "The deck with the following Share ID has been downloaded: \n\n" + this.state.shareId.trim(),
            [
              { text: "Close"
            }
            ],
            { cancelable: true }
        );
    }

    render() {
        return (
            <Container>
                <SearchHeader onSearch = {this._onSearch} canGoBack={this.props.navigation.canGoBack} goBack={this._goBack}/>
                <Root>
                    <Content padder >
                        <Grid>
                            <Row>
                                <H1>Input Share ID</H1>
                            </Row>
                        </Grid>
                        <Form padder>
                            <Item rounded>
                            <Input 
                            placeholder = "share id"
                            clearOnSubmit={false}
                            onChangeText={this._handleInput}
                            />
                            </Item>
                        </Form>   
                        <Button block info onPress={this._getDeck}>
                            <Text>Add Shared Deck</Text>
                        </Button>
                        <Grid>
                            <Row>
                                <H1>Shared Decks</H1>
                            </Row>
                        </Grid>
                        {this._createDeckViews()}
                    </Content>
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
    return decks.filter(deck => deck.title.includes(term))
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareScreen)