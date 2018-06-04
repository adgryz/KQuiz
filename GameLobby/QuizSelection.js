import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

export default class QuizSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            selectedQuiz: undefined,
            loading: true,
            quizzes: []
        };
        firebase.firestore().settings({persistence: false});
        this.ref = firebase.firestore().collection('quizzes');
        this.unsubscribe = null;
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        
       // this.ref.add({title: "test"});
      }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        if (this.state.loading) 
            return (<View><Text>loading</Text></View>);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select Quiz : </Text>
                {
                    this.state.quizzes.map(quiz => <View key={quiz.title} style={{ padding: 5 }}>
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
                            this.props.navigation.navigate('PlayerSelection', {
                                username: username,
                                quiz: this.getQuizData(this.state.selectedQuiz)
                            });
                        }} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });

    getQuizData = (quiz) => {
        console.log("questions?:")
        const questions = [];
        const q = {};
        firebase.firestore().collection("quizzes").doc(quiz.key).collection("questions").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const text = doc.data().question;
                questions.push({
                    text: text,
                    answers: [doc.data().a, doc.data().b, doc.data().c, doc.data().d]
                });
            });
            console.log(questions);
        const q = {
            title: quiz.title,
            questions: questions
        };
        return q;
       // 
        //console.log(q);
        //console.log(q.questions);
        });
        
       // return q;
    }

    onCollectionUpdate = (querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((doc) => {
         // console.log(doc.data());
          const  {title}  = doc.data();
         // console.log('halo');
          
          quizzes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title: title
          });
        });
        this.setState({ 
          quizzes: quizzes,
          loading: false,
       });
      // console.log(quizzes);
      }
}