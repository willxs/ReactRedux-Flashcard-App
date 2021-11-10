import React, { Component } from "react"
import { Container, Content } from "native-base"

import TitleHeader from "./../../components/TitleHeader"
import MainFooter from "../../components/MainFooter"


export default class StatsScreen extends Component {
    static displayName = "Stats Screen"

    render() {
        return (
            <Container>
                <TitleHeader title={StatsScreen.displayName} goBack={this.props.navigation.goBack}/>
                <Content>
                    {/* content goes here (remove curly brackets) */}
                </Content>
                <MainFooter navigation={this.props.navigation}/>
            </Container>
        )
    }
}