import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import { View, SafeAreaView } from "react-native";
import { RootStackParamList } from '../consts';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation, params }: Props) => {
	return (
		<SafeAreaView>
			<View>
			</View>				
		</SafeAreaView>
    );
}

export default HomeScreen;
