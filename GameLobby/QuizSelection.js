import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import {quizDatabase} from '../QuizTest';

export default class QuizSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            selectedQuiz: undefined
        };
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select Quiz : </Text>
                {
                    quizDatabase.quizzes.map(quiz => <View key={quiz.title} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedQuiz === quiz.title ? "#673AB7" : "#2196F3"}
                            title={quiz.title}
                            onPress={() => this.selectQuiz(quiz)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedQuiz}
                        title="Go to friend selection"
                        color="#F44336"
                        onPress={() => {
                            console.log(this.state.selectedQuiz);
                            this.props.navigation.navigate('PlayerSelection', {
                                username: username,
                                quiz: quizDatabase.quizzes.find(quiz => quiz.title === this.state.selectedQuiz)
                            });
                        }} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => {
        this.setState({ 
            selectedQuiz: quiz.title
        });
    }
}