import React from 'react';
import { View, Text, Button } from 'react-native';

export class Answers extends React.Component {

    constructor(props) {
        super(props);
        
        this.updateScores();
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Qustion :</Text>
                <Text>{this.props.question.text}</Text>
                <Text></Text>
                <Text>Answer about you: {this.props.yourAnswer}</Text>
                <Text>{this.props.friendname}'s guess about you: {this.props.friendGuess}</Text>
                <Text></Text>
                <Text>Answer about {this.props.friendname}: {this.props.friendAnswer}</Text>
                <Text>Your guess about {this.props.friendname}: {this.props.yourGuess}</Text>
            </View>
        );
    }

    updateScores = () => {
        let yourChange = this.props.yourGuess === this.props.friendAnswer ? 1 : 0;
        let friendChange = this.props.friendGuess === this.props.yourAnswer ? 1 : 0;
        console.warn("yourChange: " + yourChange);
        console.warn("friendChange: " + friendChange);

        this.props.changeScores(yourChange, friendChange);
    }

}
