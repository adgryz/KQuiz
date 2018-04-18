import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Waiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = { playerAccepted: false}

        setTimeout(() => {
            this.setState({ playerAccepted: true });
            props.navigation.navigate('QuizStart');
        }, 3000);
    }

    fakeQuizes = ["Favourite meals", "Scary", "Dreams", "Disgusting", "Songs"];

    render() {
        const { navigate, goBack } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Waiting for acceptance ...</Text>
            
                <View style={{ padding: 10 }}>
                    <Button
                        title="Cancel"
                        color="#F44336"
                        onPress={() => goBack()} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });
}