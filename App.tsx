/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
	Colors
} from 'react-native/Libraries/NewAppScreen';
import QuizQuestion from './components/QuizQuestion';
import ResultModal from './components/ResultModal';

import QuestionsList from './assets/data/questionList';
import SVGBack from './assets/svg/SvgBack';
import SVGNext from './assets/svg/SvgNext';
//@ts-ignore
import logo from "./assets/img/logo.png";

function App(): JSX.Element {
	const [selectedQuestion, selectQuestion] = useState(0)
	const [answerSelected, changeAnswerSelection] = useState<number[]>(QuestionsList.map((val, ind) =>
		-1
	))
	const [isSubmitted, submitQuizz] = useState(false)

	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<LinearGradient 
			colors={['#3550DC', '#27E9F7']}
			locations={[0.17, 1]}
			useAngle={true}
			angle={123}
			style={styles.container}
		>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<Image source={logo} style={{height: hp(10), resizeMode: "contain", alignSelf: "center", marginTop: hp(5), tintColor: "white"}} />
			<View style={{...styles.quizContainer, opacity: isSubmitted ? 0.2 : 1}}>
				<View style={{backgroundColor: "#3550DC", width: wp(8), height: 4, marginVertical: hp(3)}} />
				<View style={styles.questionIndexMainContainer}>
					{QuestionsList.map((value, index) => {
						return (
							<View 
								key={index}
								style={{
									...styles.questionIndexContainer,
									borderBottomColor: selectedQuestion === index ? "#3550DC" : "#D4D4D4", 
								}}
							>
								{selectedQuestion === index ? 
								<LinearGradient 
									colors={['#3550DC', '#27E9F7']}
									locations={[0.17, 1]}
									useAngle={true}
									angle={123}
									style={styles.questionIndexCircle}
								>
									<Text style={{color: "white", fontSize: 16}}>{index + 1}</Text>
								</LinearGradient>
								: 
								<View style={{
									...styles.questionIndexCircle,
									backgroundColor: '#D4D4D4'
								}}>
									<Text style={{color: "white", fontSize: 16}}>{index + 1}</Text>
								</View>}
							</View>
						)
					})}
				</View>
				{QuestionsList.map((value, index) => {
					return (
						<View key={index}>
							{selectedQuestion === index ? <QuizQuestion 
								question={value.question}
								index={index+1} 
								answersSet={value.answersSet} 
								rightAnswerIndex={value.rightAnswerIndex} 
								changeAnswerSelection={changeAnswerSelection}
								answerSelected={answerSelected[index]}
							/> : <></>}
						</View>
					)
				})}
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => {
						selectQuestion(selectedQuestion - 1)
					}} disabled={selectedQuestion === 0}>
						{selectedQuestion > 0 ?
							<LinearGradient 
								colors={['#3550DC', '#27E9F7']}
								locations={[0.17, 1]}
								useAngle={true}
								angle={123}
								style={styles.button}
							>
								<SVGBack />
							</LinearGradient> : 
							<View style={{
								...styles.button,
								backgroundColor: '#D4D4D4'
							}}>
								<SVGBack />
							</View>
						}
					</TouchableOpacity>
					<TouchableOpacity style={{borderRadius: 5, borderWidth: 1, borderColor: selectedQuestion < QuestionsList.length - 1 || answerSelected.includes(-1) ? "#D4D4D4" : "#3550DC", backgroundColor: "white", justifyContent: "center", alignItems: "center", width: wp(40), height: hp(5)}} disabled={selectedQuestion < QuestionsList.length - 1 || answerSelected.includes(-1)} onPress={() => submitQuizz(true)}>
						<Text style={{color: selectedQuestion < QuestionsList.length - 1 || answerSelected.includes(-1) ? "#D4D4D4" : "#3550DC", fontSize: 18, fontWeight: selectedQuestion < QuestionsList.length - 1 || answerSelected.includes(-1) ? "500" :"bold"}}>Submit</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {
						selectQuestion(selectedQuestion + 1)
					}} disabled={selectedQuestion === QuestionsList.length - 1}>
						{selectedQuestion < QuestionsList.length - 1 ?
							<LinearGradient 
								colors={['#3550DC', '#27E9F7']}
								locations={[0.17, 1]}
								useAngle={true}
								angle={123}
								style={styles.button}
							>
								<SVGNext />
							</LinearGradient> : 
							<View style={{
								...styles.button,
								backgroundColor: '#D4D4D4'
							}}>
								<SVGNext />
							</View>
						}
					</TouchableOpacity>
				</View>
			</View>
			<ResultModal 
				selectedAnswer={answerSelected}
				modalVisible={isSubmitted}
				setModalVisibility={submitQuizz}
			/>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		flex: 1
	},
	questionIndexMainContainer: {
		height: hp(5),
		width: wp(90),
		justifyContent: "space-between",
		flexDirection: "row",
		backgroundColor: "white"
	},
	quizContainer: {
		flexDirection: "column",
		backgroundColor: "white",
		width: wp(100),
		height: hp(80),
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingBottom: hp(5)
	},
	questionIndexContainer: {
		backgroundColor: "white",
		height: hp(5),
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: wp(18),
		borderBottomWidth: 1.5, 
	},
	questionIndexCircle: {
		width: wp(8),
		height: wp(8),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: wp(5)
	},
	button: {
		width: wp(11),
		height: wp(11),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: wp(10)
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: hp(5),
		width: wp(90),
		backgroundColor: "white",
		alignItems: "center"
	}
});

export default App;
