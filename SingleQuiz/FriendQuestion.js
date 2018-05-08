import React from 'react';
import { View, Text, Button } from 'react-native';

export class FriendQuestion extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Now answer about {this.props.friendname}.</Text>
                <Text>{this.props.question.text}</Text>
                {
                    this.props.question.answers.map(answer => <Text
                        onPress={() => this.props.onSelect(answer)}
                        style={{ color: this.props.selectedAnswer === answer ? "#673AB7" : "#2196F3" }}>
                        {answer}
                    </Text>)
                }
            </View>
        );
    }
}

