import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QuestionsList from '../assets/data/questionList';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import SVGSmiley from '../assets/svg/SvgSmiley';
import LinearGradient from 'react-native-linear-gradient';

type ResultModalProps = {
    selectedAnswer: number[],
    modalVisible: boolean,
    setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const ResultModal = (props: ResultModalProps) => {
    const numberOfRightAnswer: number = props.selectedAnswer.filter((val, ind) => {
        return val === QuestionsList[ind].rightAnswerIndex
    }).length
    const incorrectAnswers: {
        questionIndex: number
        wrongAnswer: string,
        rightAnswer: string,
        question: string,
        selectedAnswer: number
    }[] = props.selectedAnswer.map((v, i) => {
        return {
            questionIndex: i,
            wrongAnswer: QuestionsList[i].answersSet[v],
            rightAnswer: QuestionsList[i].answersSet[QuestionsList[i].rightAnswerIndex],
            question: QuestionsList[i].question,
            selectedAnswer: v
        }
    }).filter((val, ind) => val.selectedAnswer !== QuestionsList[ind].rightAnswerIndex)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.container}>
                {numberOfRightAnswer === QuestionsList.length ?
                    <>
                        <Text style={styles.title}>Bravo !</Text>
                        <Text style={styles.subtitle}>Vous avez réussi à toutes les questions !</Text>
                        <SVGSmiley />
                    </> :
                    <>
                        <Text style={styles.title}>Mince !</Text>
                        <Text style={styles.subtitle}>Vous avez réussi {numberOfRightAnswer}/{QuestionsList.length} questions.</Text>
                        <ScrollView style={styles.incorrectAnswersContainer} horizontal={false} showsVerticalScrollIndicator={false}>
                            {incorrectAnswers.map((val, ind) => {
                                return (
                                    <View style={{flexDirection: "column", marginBottom: hp(2)}} key={ind}>
                                        <View style={{flexDirection: "row", alignItems: "center", marginBottom: hp(2)}}>
                                            <LinearGradient 
                                                colors={['#3550DC', '#27E9F7']}
                                                locations={[0.17, 1]}
                                                useAngle={true}
                                                angle={123}
                                                style={{
                                                    width: wp(5),
                                                    height: wp(5),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: wp(5)
                                                }}
                                            >
                                                <Text style={{color: "white", fontSize: 16}}>{val.questionIndex + 1}</Text>
                                            </LinearGradient>
                                            <Text style={{fontSize: 16, color: "black", marginLeft: wp(2), fontWeight: "600", flex: 1, flexWrap: "wrap"}}>
                                                {val.question}
                                            </Text>
                                        </View>
                                        <View style={styles.resultContainer}>
                                            <Text style={styles.label}>
                                                Votre réponse :
                                            </Text>
                                            <Text style={styles.numberOfAnswers}>
                                                {val.wrongAnswer}
                                            </Text>
                                        </View>
                                        <View style={styles.resultContainer}>
                                            <Text style={styles.label}>
                                                La bonne réponse :
                                            </Text>
                                            <Text style={styles.numberOfAnswers}>
                                                {val.rightAnswer}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </>
                }
                <TouchableOpacity style={{borderRadius: 5, borderWidth: 1, borderColor: "#3550DC", backgroundColor: "white", justifyContent: "center", alignItems: "center", width: wp(40), height: hp(5), marginTop: hp(2)}} onPress={() => props.setModalVisibility(false)}>
                    <Text style={{color: "#3550DC", fontSize: 18, fontWeight: "bold"}}>Fermer</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        top: "20%", 
        left: "10%", 
        position: "absolute", 
        bottom: "20%", 
        right: "10%",
        alignItems: "center",
        flexDirection: "column",
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#3550DC",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        marginBottom: hp(2)
    },
    subtitle: {
        fontSize: 18,
        color: "black",
        marginBottom: hp(2)
    },
    incorrectAnswersContainer: {
        height: hp(30),
        width: "100%",
        backgroundColor: "white"
    },
    label: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold"
    },
    numberOfAnswers: {
        fontSize: 14,
        color: "black",
        marginLeft: wp(2)
    },
    resultContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(1),
        marginLeft: wp(12)
    }
})

export default ResultModal;
