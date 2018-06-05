import firebase from 'react-native-firebase';

export default class QuizDatabase {
    quizzes = [];
    getQuizzes(){
        const current = [];
        return firebase.firestore().collection('quizzes')
        .get()
        .then((snapshot) => {
            snapshot.forEach(async doc => {
                current.push({
                    id: doc.id,
                    title: doc.data().title,
                    questions: doc.data().questions
                });
            });
            this.quizzes = current;
        });
    }
}

export const quizDatabase = new QuizDatabase();