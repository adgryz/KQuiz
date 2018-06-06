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
                <Text>You: {this.props.yourAnswer}</Text>
                {
                    this.props.yourAnswer === this.props.friendGuess ?
                        <Text style={{ fontWeight: 'bold', color='#4CAF50' }}>
                            {this.props.friendname} was right
                        </Text>
                        :
                        <Text style={{ fontWeight: 'bold', color='#f44336' }} >
                            {this.props.friendname} was wrong: {this.props.friendGuess}
                        </Text>
                }
                <Text></Text>
                <Text>{this.props.friendname}: {this.props.friendAnswer}</Text>
                {
                    this.props.friendAnswer === this.props.yourGuess ?
                        <Text style={{ fontWeight: 'bold', color='#4CAF50' }}>
                            You was right
                        </Text>
                        :
                        <Text style={{ fontWeight: 'bold', color='#f44336' }}>
                            You was wrong: {this.props.yourGuess}
                        </Text>
                }
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
