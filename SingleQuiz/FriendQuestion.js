import React from 'react';
import { View, Text, Button } from 'react-native';
import OptionButton from "../Custom/OptionButton";

export class FriendQuestion extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#F2F2F2'}}>
                        Now answer about &nbsp;
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#0AD560'}} >
                            {this.props.friendname}
                        </Text>
                    </Text>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 20,  color: '#F2F2F2' }}>
                        {this.props.question.text}
                    </Text>
                </View>
                <View>
                    {
                        this.props.question.answers.map(answer => <View key={answer} style={{ width: 300, margin: 10 }}>
                            <OptionButton
                                title={this.props.friendname + ": " + answer}
                                isSelected={this.props.selectedAnswer === answer}
                                onPress={() => this.props.onSelect(answer)} />
                        </View>)
                    }
                </View>
            </View>
        );
    }
}

