import React, { useState, useRef } from 'react';
import {	Button, 
			SafeAreaView, 
			StyleSheet, 
			Text, 
			TextInput, 
			TouchableOpacity, 
			View 
		} from "react-native";
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../consts';
import firestore from '@react-native-firebase/firestore';


type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {

	const [ signup, setSignup ] = useState(false);
	const [ error, setError ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");

	var emailInput = useRef() as React.RefObject<TextInput>;
	var passInput = useRef() as React.RefObject<TextInput>;
	var userInput = useRef() as React.RefObject<TextInput>;


	const usersCollection = firestore().collection('users');

	function toggleSignup() {
		setUsername("");
		if(userInput.current) {
			userInput.current.clear();
		}
		setPassword("");
		if(passInput.current) {
			passInput.current.clear();
		}
		setEmail("");
		if(emailInput.current) {
			emailInput.current.clear();
		}
		setError("");
		setSignup(!signup);
	}

	function attemptSignup(email: string, username: string, password: string) {
		if (email == "") {
			setError("email cannot be empty.");
			return;
		}
		if (username == "") {
			setError("username cannot be empty.")
			return;
		}
		if (password == "") {
			setError("password cannot be empty.")
			return;
		}
		if (password.length < 8) {
			setError("password must be 8 characters or more.")
			return;
		}
		auth().createUserWithEmailAndPassword(email, password)
		.then( userCredentials => {
			var usernameField = usersCollection.doc(username);
			usernameField.get().then((doc) => {
				if(doc.exists) {
					setError("that username is taken.");
					return;
				} else {
					usernameField.set({
						uid: userCredentials.user.uid,	
						email: userCredentials.user.email,
						username: username,
					})
					navigation.navigate("Home", { userId: userCredentials.user.uid });
				}
			});
		})
		.catch( e => {
			if(e.code == "auth/email-already-in-use") {
				setError("an account with that email already exists.");
			} else if(e.code == "auth/invalid-email") {
					setError("that is not a valid email address.");
			} else {
				console.warn(e.message);
			}
		});
	}
	
	function attemptLogin(email: string, password: string) {
		if (email == "") {
			setError("email cannot be empty.");
			return;
		}
		if (password == "") {
			setError("password cannot be empty.")
			return;
		}
		auth().signInWithEmailAndPassword(email, password)
			.then( userCredentials => {
				navigation.navigate("Home", { userId: userCredentials.user.uid });
			} )
			.catch( e => {
				if(e.code == "auth/wrong-password" || 
					e.code == "auth/user-not-found") {
					setError("incorrect username or password.");
				} else if(e.code == "auth/invalid-email") {
					setError("that is not a valid email address.");
				} else {
					console.warn(e.code);
					console.warn(e.message);
				}
			} );
	}

	return (
		<SafeAreaView style={styles.container}>
			{								// Conditionally render username box 
				signup ?
				<View style={styles.inputView}>
					<TextInput 
						ref={userInput}
						style={styles.textInput}
						placeholder="username"
						onChangeText={ text => setUsername(text) }
					/>
				</View>
				: <></>
			}
			<View style={styles.inputView}>
				<TextInput 
					ref={emailInput}
					style={styles.textInput}
					placeholder="email"
					onChangeText={ text => setEmail(text) }
				/>
			</View>
		<View style={styles.inputView}>
				<TextInput 
					ref={passInput}
					style={styles.textInput}
					placeholder="password"
					secureTextEntry={true}
					onChangeText={ text => setPassword(text) }
				/>
			</View>
			{								// Conditionally render error label
				error == "" ? <></> : 
				<View style={styles.inputView}>
					<Text style={styles.incorrect}>{ error }</Text>
				</View>
			}
			<TouchableOpacity style={styles.forgotButton}>
				<Text>forgot password?</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={styles.forgotButton}
				onPress={ toggleSignup }
			>
				<Text>
				{
					signup ? "log in instead" : "register a new account"
				}
				</Text>
			</TouchableOpacity>
			<Button 
				title={ signup ? "register" : "login" }
				onPress={ () => { 
					signup	? attemptSignup(email, username, password) 
							: attemptLogin(email, password) } 
						}
			/>
		</SafeAreaView>
   );
};

const styles = StyleSheet.create({
	incorrect: {
		color: "red",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	inputView: {
		width: "80%",
		alignItems: "center",
		height: 45,
		marginBottom: 10,
	},
	textInput: {
		width: "100%",
		flex: 1,
		padding: 10,
	},
	forgotButton: {
		height: 20,
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 30,
	},
});

export default LoginScreen;
