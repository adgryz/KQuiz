import firebase from 'react-native-firebase';

export default getQuiz = async (key) => {
    const questions = [];
    var title = "t";
    var docRef = firebase.firestore().collection("quizzes").doc(key);
    var doc = await docRef.get();
    title = doc.data().title;
    var querySnapshot = await firebase.firestore().collection("quizzes").doc(key).collection("questions").get();/*.then(function(querySnapshot) {*/
        querySnapshot.forEach(function(doc) {
            const text = doc.data().question;
            questions.push({
                text: text,
                answers: [doc.data().a, doc.data().b, doc.data().c, doc.data().d]
            });
        });
    const q = {
        id: key,
        title: title,
        questions: questions
    };
    return q;
}