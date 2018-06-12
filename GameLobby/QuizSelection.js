import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { quizDatabase } from '../QuizTest';
import NavButton from '../Custom/NavButton';
import OptionButton from '../Custom/OptionButton';


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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15, color: '#F2F2F2' }}>Select Quiz</Text>
                {
                    quizDatabase.quizzes.map(quiz => <View key={quiz.title} style={{ padding: 5, minWidth: 200 }}>
                        <OptionButton
                            isSelected={this.state.selectedQuiz === quiz.title}
                            title={quiz.title}
                            onPress={() => this.selectQuiz(quiz)} />
                    </View>)
                }
                <View style={{ padding: 10, marginTop: 15 }}>
                    <NavButton
                        disabled={!this.state.selectedQuiz}
                        title="GO TO FRIEND SELECTION"
                        bgColor="#f44336"
                        onPress={() => {
                            this.props.navigation.navigate('PlayerSelection', {
                                username: username,
                                quiz: quizDatabase.quizzes.find(quiz => quiz.title === this.state.selectedQuiz)
                            });
                        }}
                        color="#303030"
                        bgColorDisabled="#231F20"
                        colorDisabled="#303030"
                    />
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