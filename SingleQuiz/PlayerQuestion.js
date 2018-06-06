import React from 'react';
import { View, Text, Button } from 'react-native';

export class PlayerQuestion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                        {this.props.question.text}
                    </Text>
                </View>
                <View>
                    {
                        this.props.question.answers.map(answer => <View style={{ width: 300, margin: 10 }}>
                            <Button
                                key={answer}
                                title={answer}
                                color={this.props.selectedAnswer === answer ? "#673AB7" : "#2196F3"}
                                onPress={() => this.props.onSelect(answer)} />
                        </View>)
                    }
                </View>
            </View>
        );
    }
}
