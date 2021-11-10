import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { Text, Icon, Toast, Button, Root } from 'native-base'

//import DeckModel from "./../../data/Deck"
import Strong from "./../../components/Strong"
import colors from "./../../styles/colors"

class ProgressInfo extends Component {
    static displayName = "Deck Progress"

    constructor(props) {
        super(props)
        this.state = {
            showToast: false
        }
    }

    onPressLTM = () => {
        let ltmCards = this.props.memorized
        Toast.show({
            text: `you have ${ltmCards} cards in long term memory!`,
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: colors.greenright }
        })
    }

    onPressDue = () => {
        let stmCards = this.props.due
        Toast.show({
            text: `you have ${stmCards} cards due!`,
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: colors.greenright }
        })
    }

    onPressUnlearned = () => {
        let unlearnedCards = this.props.count - this.props.memorized
        Toast.show({
            text: `you have not memorized ${unlearnedCards} cards!`,
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: colors.greenright }
        })
    }

    render() {
        return (
            <View style={styles.row}>
                <Button style={styles.button} transparent onPress={this.onPressLTM}>
                    <Icon active type="MaterialCommunityIcons" name="progress-check" style={[styles.icon_LTM, styles.icon]} />
                    <Text style={styles.text}>{this.props.memorized}</Text>
                </Button>
                <Button style={styles.button} transparent onPress={this.onPressDue}>
                    <Icon active type="MaterialCommunityIcons" name="progress-clock" style={[styles.icon_STM, styles.icon]} />
                    <Text style={styles.text}>{this.props.due}</Text>
                </Button>
                <Button style={styles.button} transparent onPress={this.onPressUnlearned}>
                    <Icon active type="MaterialCommunityIcons" name="progress-alert" style={[styles.icon_unlearned, styles.icon]} />
                    <Text style={styles.text}>{this.props.count - this.props.memorized}</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: colors.white,
    },

    icon: {
        //backgroundColor : colors.white,
        padding: 1,
    },

    icon_unlearned: {
        color: colors.redwrong,
    },

    icon_STM: {
        color: colors.yellowprogress,
    },

    icon_LTM: {
        color: colors.greenright,
    },

    text: {
        //backgroundColor: colors.white,
        paddingRight: 0,
        paddingLeft: 2,
    }
})

export default ProgressInfo;