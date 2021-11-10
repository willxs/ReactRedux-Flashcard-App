import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { Text, Left, Body, Right, Icon, Card, CardItem, Row } from 'native-base'

//import DeckModel from "./../../data/Deck"
import Strong from "./../../components/Strong"
import colors from "./../../styles/colors"
import ProgressInfo from "./ProgressInfo"

class Deck extends Component {
    static displayName = "Deck"

    onPress = () => {
        this.props.onPress()
    }

    render() {
        return (
            <Card style={styles.item}>
                <CardItem header style={[styles.cardHeader, styles.color]} button onPress={this.props.onPress}>
                    <Left>
                        <Strong>{this.props.deck.title}</Strong>
                    </Left>
                    <Body>
                        <Strong>{this.props.count} Cards</Strong>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward"  style={styles.icon}/>
                    </Right>
                </CardItem>

                <CardItem style={styles.cardBody} button onPress={this.props.onPress}>
                    <Left>
                        <Text>
                            {this.props.deck.subtitle}
                        </Text>
                    </Left>
                    <Right>
                        <ProgressInfo due={this.props.deck.getDueCards()} memorized={this.props.deck.getMemorizedCards()} count={this.props.count}/>
                    </Right>
                </CardItem>
          </Card>
        )
    }
}

const styles = StyleSheet.create({
    item: {  },
    color: { backgroundColor: colors.pink },
    cardHeader : { paddingBottom : 5, paddingTop : 5 },
    cardBody : { paddingBottom : 5, paddingTop : 0 },
    icon: { color: colors.white }
})
  
export default Deck;