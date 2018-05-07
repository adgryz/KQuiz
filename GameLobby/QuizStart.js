import React from 'react';
import { View, Text, Button } from 'react-native';

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedQuiz: undefined }

        setTimeout(() => {
            const { params } = props.navigation.state;
            const username = params ? params.username : null;
            const friendname = params ? params.friendname : null;
            const quiz= params ? params.quiz : null;

            this.props.navigation.navigate('Quiz', {
                username: username,
                friendname: friendname,
                quiz: quiz
             });
        }, 3000);
      
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const friendname = params ? params.friendname : null;
        const quiz= params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Quiz {quiz.title} started</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>&</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{friendname}</Text>
            </View>
        );
    }

    
}
