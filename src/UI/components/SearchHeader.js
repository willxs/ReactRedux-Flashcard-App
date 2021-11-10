import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Left, Body, Right, Segment, Content } from 'native-base';

export default class SearchHeader extends Component {

    _canGoBack() {
        let back = <Left style={{flex: 0.14}}>
                        <Button transparent onPress={this.props.goBack}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
        return(this.props.canGoBack ? back : null )
    }

    _onChangeSearchText = (text) => {
        this.props.onSearch(text)
    }

    render() {
        return (
            <Header searchBar rounded>
                {this._canGoBack()}
                <Item>
                    <Icon name="ios-search" />
                    <Input  onChangeText={this._onChangeSearchText}
                            placeholder="What are you looking for?" />
                </Item>
            </Header>
        );
    }
}