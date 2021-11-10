import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class TitleHeader extends Component {

    _icon = () => {
        let icon = <Button transparent onPress={this.props.iconPressed}>
                        <Icon name='information-circle' />
                    </Button>
        return (this.props.iconPressed ? icon : null)
    }

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.props.goBack}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    {this._icon()}
                </Right>
            </Header>
        );
    }
}