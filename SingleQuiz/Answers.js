import React from 'react';
import { View, Text, Button } from 'react-native';

export class Answers extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const friendAnswer = "ToDo"; // TODO - communication
        const friendGuess = "ToDo"; // TODDO - communication

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>You like: {this.props.yourAnswer}</Text>
                <Text>{this.props.friendname} answered you like: {friendGuess}</Text>
                <Text>{this.props.friendname} likes: {friendAnswer}</Text>
                <Text>You answered {this.props.friendname} likes: {this.props.yourGuess}</Text>
            </View>
        );
    }

}
