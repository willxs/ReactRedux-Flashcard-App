import React, { Component } from "react"
import { Container, Content, Form, Label, Input, Button, Item, Text } from "native-base"

import TitleHeader from "../../components/TitleHeader"
import MainFooter from "../../components/MainFooter"

import { connect } from 'react-redux'
import { addCardAction } from "./../../../actions/creators"

class NewCardScreen extends Component {
    static displayName = "New Card"

    constructor(props) {
        super(props)
        this.state = { front : "", back : ""}
    }

    _handleFront = text => {
        this.setState({ front: text })
    }

    _handleBack = text => {
        this.setState({ back: text })
    }

    _createCard = () => {
        if (this.state.front === "" || this.state.back === "") {
            alert("Please fill in the title and subtitle fields.")
            return
        }
        
        this.props.createCard(this.state.front, this.state.back, this.props.route.params.deckID);
        this.props.navigation.navigate("View Deck")
    }

    render() {
        return (
            <Container>
                <TitleHeader title={NewCardScreen.displayName} goBack={this.props.navigation.goBack}/>
                <Content padder>
                    <Form>
                        <Item stackedLabel>
                        <Label>Front</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleFront}
                        />
                        </Item>
                        <Item stackedLabel last>
                        <Label>Back</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleBack}
                        />
                        </Item>
                    </Form>

                    <Button block onPress={this._createCard}>
                        <Text>Create Card</Text>
                    </Button>
                </Content>
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        decks : state.decks,
        //currentDeck : state.decks.find(deck => deck.id === ownProps.route.params.deckID)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createCard: (front, back, deckID) => {
            dispatch(addCardAction(front, back, deckID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardScreen)