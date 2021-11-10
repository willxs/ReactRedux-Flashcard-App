import React, { Component } from "react"
import { StyleSheet, View } from 'react-native';
import { Text, Card, CardItem, Button, Icon, Left, Body, Right } from 'native-base'
import { ProgressBar } from 'react-native-paper'

import ProgressInfo from "./ProgressInfo"
import Strong from "./../../components/Strong"
import colors from "./../../styles/colors"



class RecentDeck extends Component {
    static displayName = "Card"

    onPress = () => {
        this.props.onPress()
    }

    render() {
        return (
            <Card style={{ flex: 1 }}>
                <CardItem button onPress={this.props.onPress}>
                    <Left>
                        <Body>
                            <Text>{this.props.deck.title}</Text>
                            <Text note>{this.props.deck.subtitle}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <View>
                        <ProgressBar progress={0.5} color={colors.blue2} />
                    </View>
                </CardItem>
                <CardItem style={styles.status}>
                    <Left>
                        <ProgressInfo due={this.props.deck.getDueCards()} memorized={this.props.deck.getMemorizedCards()} count={this.props.deck.cards.length}/>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}


const styles = StyleSheet.create({
    recentDecks : {
        backgroundColor : colors.tan,
    },

    status : {
        paddingBottom : 0, paddingTop : 0,
        //backgroundColor : colors.gray1,
    },

    button : {
        backgroundColor : colors.white,
    },

    icon : {
        //backgroundColor : colors.white,
        padding: 1,
    },

    icon_unlearned : {
        color: colors.redwrong,
    },

    icon_STM : {
        color: colors.yellowprogress,
    },

    icon_LTM : {
        color: colors.greenright,
    },

    text : {
        //backgroundColor: colors.white,
        paddingRight : 0,
        paddingLeft  : 2,
    }
})

export default RecentDeck