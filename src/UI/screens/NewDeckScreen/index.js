import React, { Component } from "react"
import { Container, Content, Form, Label, Input, Button, Item, Text } from "native-base"

import TitleHeader from "./../../components/TitleHeader"

import { connect } from 'react-redux'
import { addDeckAction } from "./../../../actions/creators"
import MainFooter from "../../components/MainFooter"


class NewDeckScreen extends Component {
    static displayName = "New Deck"
    static initialState = { title: "", subtitle: "" };
    constructor(props) {
        super(props)
        this.state = NewDeckScreen.initialState
    }

    _handleTitle = text => {
        this.setState({ title: text })
    }

    _handleSubtitle = text => {
        this.setState({ subtitle: text })
    }

    _createDeck = () => {
        if (this.state.title === "" || this.state.subtitle === "") {
            alert("Please fill in the title and subtitle fields.")
            return
        }

        this.props.createDeck(this.state.title, this.state.subtitle)
        this.props.navigation.navigate("Home")
    }

    render() {
        return (
            <Container>
                <TitleHeader title={NewDeckScreen.displayName} goBack={this.props.navigation.goBack}/>
                <Content padder>
                    <Form>
                        <Item stackedLabel>
                        <Label>Deck Title</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleTitle}
                        />
                        </Item>
                        <Item stackedLabel last>
                        <Label>Deck Subtitle</Label>
                        <Input 
                            clearOnSubmit={false}
                            onChangeText={this._handleSubtitle}
                        />
                        </Item>
                    </Form>

                    <Button block onPress={this._createDeck}>
                        <Text>Save Deck</Text>
                    </Button>
                </Content>
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        decks : state.decks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createDeck: (title, subtitle) => {
            dispatch(addDeckAction(title, subtitle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen);