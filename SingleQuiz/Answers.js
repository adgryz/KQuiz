import React from 'react';
import { View, Text, Button } from 'react-native';

export class Answers extends React.Component {

    constructor(props) {
        super(props);

        this.updateScores();
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text  style={{fontWeight: 'bold', fontSize: 18, color: '#F2F2F2'}}>Qustion :</Text>
                <Text  style={{fontWeight: 'bold', fontSize: 18, color: '#F2F2F2'}}>{this.props.question.text}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#F2F2F2', marginTop: 25}}>You: {this.props.yourAnswer}</Text>
                {
                    this.props.yourAnswer === this.props.friendGuess ?
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0AD560' }}>
                            {this.props.friendname} was right
                        </Text>
                        :
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ED1C24' }} >
                            {this.props.friendname} was wrong: {this.props.friendGuess}
                        </Text>
                }
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#F2F2F2', marginTop: 15 }}>{this.props.friendname}: {this.props.friendAnswer}</Text>
                {
                    this.props.friendAnswer === this.props.yourGuess ?
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0AD560' }}>
                            You was right
                        </Text>
                        :
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ED1C24' }}>
                            You was wrong: {this.props.yourGuess}
                        </Text>
                }
            </View>
        );
    }

    updateScores = () => {
        let yourChange = this.props.yourGuess === this.props.friendAnswer ? 1 : 0;
        let friendChange = this.props.friendGuess === this.props.yourAnswer ? 1 : 0;
        this.props.changeScores(yourChange, friendChange);
    }

}
