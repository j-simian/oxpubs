import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../consts";

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList>
}

const Back = ({ navigation }: Props) => {

	return (
		<TouchableOpacity
			style={styles.back}
			onPress={ (e) => { navigation.goBack() } }
		/>
	);
}

const styles = StyleSheet.create({
	back: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "white",
		alignSelf: "flex-start",
		marginLeft: 30,
		marginTop: 30,
	}
});

export default Back;
