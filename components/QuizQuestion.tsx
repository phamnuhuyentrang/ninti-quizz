import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type QuizQuestionProps = {
    question: string,
    index: number,
    answersSet: string[],
    rightAnswerIndex: number,
    answerSelected: number
    changeAnswerSelection: React.Dispatch<React.SetStateAction<number[]>>
}

const alphabeticalOrder = "ABCD"

const QuizQuestion = (props: QuizQuestionProps) => {
    const [selectedAnswer, selectAnswer] = useState(props.answerSelected)

    return (
        <View style={styles.container}>
            <Text style={styles.questionLabel}>{props.question}</Text>
            <View style={{flexDirection: "column", marginTop: hp(2)}}>
                {props.answersSet.map((value, index) => {
                    return (
                        <TouchableOpacity 
                            style={styles.answerContainer}
                            key={index} 
                            onPress={() => {
                                selectAnswer(index)
                                props.changeAnswerSelection(answer => answer.map((val, ind) => {
                                    if (ind === props.index - 1) {
                                        val = index
                                    }
                                    return val;
                                }))
                            }}
                        >
                            {selectedAnswer === index ? 
                            <LinearGradient 
                                colors={['#3550DC', '#27E9F7']}
                                locations={[0.17, 1]}
                                useAngle={true}
                                angle={123}
                                style={styles.answerIndex}
                            >
                                <Text style={styles.answerIndexLabel}>{alphabeticalOrder.charAt(index)}</Text>
                            </LinearGradient>
                            : 
                            <View style={{...styles.answerIndex, backgroundColor: '#D4D4D4'}}>
                                <Text style={styles.answerIndexLabel}>{alphabeticalOrder.charAt(index)}</Text>
                            </View>}
                            <Text style={{
                                color: selectedAnswer === index ? "#3550DC" : "#333",
                                fontSize: 16,
                                marginLeft: wp(3)
                            }}>{value}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: wp(90),
        alignSelf: "center",
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: '10%'
    },
    answerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(2)
    },
    questionLabel: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold"
    },
    answerIndex: {
        width: wp(10),
        height: wp(10),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp(5)
    },
    answerIndexLabel: {
        color: "white",
        fontSize: 16
    }
})

export default QuizQuestion;