import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../consts";
import FloatingButton from './FloatingButton';
import BackSvg from '../../assets/backSvg.svg';

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList>
}

const Back = ({ navigation }: Props) => {

	return (
		<FloatingButton
			onPress={ (e) => { navigation.goBack() } }
			icon={BackSvg}
			pos={styles.back}
		/>
	);
}

const styles = StyleSheet.create({
	back: {
		alignSelf: "flex-start",
		marginLeft: 30,
		marginTop: 30,
	}
});

export default Back;
