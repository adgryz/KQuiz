import React from 'react';
import { View, Text, Button } from 'react-native';

export class AnswerWaiting extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#231F20" }}>Waiting for {this.props.friendname} answers ...</Text>
            </View>
        );
    }

}