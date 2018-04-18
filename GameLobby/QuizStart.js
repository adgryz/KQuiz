import React from 'react';
import { View, Text, Button } from 'react-native';

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedQuiz: undefined }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Quiz quiz_name started</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>user_name</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>&</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>friend_name</Text>
            </View>
        );
    }
}
