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

    fakeQuizes = [
        {
            id: 1,
            title: "Favourite meals",
            questions: [
                {
                    text: "What is the best italian dish ?",
                    answers: ["Spaghetti", "Carbonara", "Pizza", "Lazagne"]
                },
                {
                    text: "What is the best polish food ?",
                    answers: ["Bigos", "Pierogi", "Schabowe", "Gołąbki"]
                },
                {
                    text: "Favourite cusine ?",
                    answers: ["Polish", "Italian", "Thai", "French"]
                }
            ]
        },
        {
            id: 2,
            title: "Scary",
            questions: [
                {
                    text: "The most scary are ?",
                    answers: ["clowns", "snakes", "spiders", "debts"]
                },
                {
                    text: "What is you favourite monster ?",
                    answers: ["Alien", "Dracula", "Predator", "Werewolf"]
                }
            ]
        }
    ];

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
                            onPress={() => this.selectQuiz(quiz.title)} />
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
                                quiz: this.state.quizzes.filter(quiz => quiz.title == this.state.selectedQuiz)[0]
                            });
                        }} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });

    onCollectionUpdate = (querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((doc) => {
          const  {title}  = doc.data();
          console.log('halo');
          console.log(doc.data());
          quizzes.push({
            key: doc.id,
           // doc, // DocumentSnapshot
            title
          });
        });
        this.setState({ 
          quizzes: quizzes,
          loading: false,
       });
      }
}