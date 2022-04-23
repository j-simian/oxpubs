import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoginScreen from './lib/screens/LoginScreen';
import HomeScreen from './lib/screens/HomeScreen';
import { RootStackParamList } from './lib/consts';

const App = () => {


	const [ firebaseInitialising, setFirebaseInitialising ] = useState(true);
	const [ user, setUser ] = useState<FirebaseAuthTypes.User | null>();

	useEffect(() => {
		auth().onAuthStateChanged( userState => {
			setUser(userState);
			if(firebaseInitialising) {
				setFirebaseInitialising(false);
			}
		} );
	});

	const Stack = createNativeStackNavigator<RootStackParamList>();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default App;
