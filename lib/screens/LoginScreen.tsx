import React, {useState} from 'react';
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
import CSS from 'csstype';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {

	const [ signup, setSignup ] = useState(false);
	const [ error, setError ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");

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
		auth().createUserWithEmailAndPassword(email, password);
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
			{ 
				signup ? 
				<View style={styles.inputView}>
					<TextInput 
						style={styles.textInput}
						placeholder="username"
						onChangeText={ text => setUsername(text) }
					/>
				</View>
				: <></>
			}
			<View style={styles.inputView}>
				<TextInput 
					style={styles.textInput}
					placeholder="email"
					onChangeText={ text => setEmail(text) }
				/>
			</View>
		<View style={styles.inputView}>
				<TextInput 
					style={styles.textInput}
					placeholder="password"
					secureTextEntry={true}
					onChangeText={ text => setPassword(text) }
				/>
			</View>
			{ 
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
				onPress={ () => { setSignup(!signup) } }
			>
				<Text>
				{
					signup ? "log in instead" : "register a new account"
				}
				</Text>
			</TouchableOpacity>
			<Button 
				title="login"
				onPress={ () => { attemptLogin(email, password) } }
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
