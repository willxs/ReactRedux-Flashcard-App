import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view'
import { Button, Text, Icon } from 'native-base'

import Deck from './Deck'
import colors from './../../styles/colors'
export default class DeckList extends Component {
    
    _onShare = (deck) => {
        this.props.onShare(deck)
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (deck) => {
        this.props.onDelete(deck)
    };

    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    renderItem = data => (
        <Deck deck={data.item} count={data.item.cards.length} key={data.item.id} onPress={() => this.props.onPress(data.item.id)} />
    )

    renderHiddenItem = (data, rowMap) => (

        <View style={styles.rowBack}>
            <Button iconLeft style={styles.shareButton} onPress={() => this._onShare(data.item)}>
                <Icon name='share' />
                <Text>Share</Text>
            </Button>

            <Button iconLeft style={styles.deleteButton} onPress={() => this.deleteRow(data.item)}>
                <Icon name='trash' />
                <Text>Delete</Text>
            </Button>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    //useFlatList={true}
                    keyExtractor={item => String(item.id)}
                    data={this.props.decks}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    leftOpenValue={150}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={this.onRowDidOpen}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        paddingLeft: 0,
        paddingTop: 0,
        //backgroundColor: colors.blue2,
    },
    rowBack: {
        alignItems: 'center',
        //backgroundColor: 'green',
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        padding: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 5,
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 5,
    },
    shareButton: {
        //alignItems: 'center',
        bottom: 5,
        left: 5,
        //justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: 140,
        height: 82,
        //flexDirection: 'column',
        backgroundColor: colors.blue2,
    },

    deleteButton: {
        //alignItems: 'center',
        bottom: 5,
        right: 5,
        //justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: 140,
        height: 82,
        //flexDirection: 'column',
        backgroundColor: colors.redwrong,
    }
});
