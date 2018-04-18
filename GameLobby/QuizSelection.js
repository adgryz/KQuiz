import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class QuizSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedQuiz: undefined }
    }

    fakeQuizes = ["Favourite meals", "Scary", "Dreams", "Disgusting", "Songs"];

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select Quiz : </Text>
                {
                    this.fakeQuizes.map(quiz => <View key={quiz} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedQuiz === quiz ? "#673AB7" : "#2196F3"}
                            title={quiz}
                            onPress={() => this.selectQuiz(quiz)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedQuiz}
                        title="Go to friend selection"
                        color="#F44336"
                        onPress={() => {
                            this.props.navigation.navigate('PlayerSelection', {
                              username: username,
                              quiz: this.state.selectedQuiz
                            });
                          }} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });
}