import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoginScreen from './lib/screens/LoginScreen';
import HomeScreen from './lib/screens/HomeScreen';
import AddScreen from './lib/screens/AddScreen';
import { RootStackParamList } from './lib/consts';
import {LogBox} from 'react-native';

const App = () => {


	const [ firebaseInitialising, setFirebaseInitialising ] = useState(true);
	const [ user, setUser ] = useState<FirebaseAuthTypes.User | null>();

	var initialRoute: keyof RootStackParamList = "Login";

	LogBox.ignoreLogs([
		"exported from 'deprecated-react-native-prop-types'.",
	]);
	useEffect(() => {
		var unsubscribeAuth = auth().onAuthStateChanged( userState => {
			setUser(userState);
			if(user) {
				initialRoute = "Home";
			}
			if(firebaseInitialising) {
				setFirebaseInitialising(false);
			}
		} );

		return () => {
			unsubscribeAuth();
		};
	});

	const Stack = createNativeStackNavigator<RootStackParamList>();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Add" component={AddScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default App;
