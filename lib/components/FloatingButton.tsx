import React from "react";
import {GestureResponderEvent, StyleSheet, TouchableOpacity} from "react-native";
import {Styles, SvgProps} from "react-native-svg";
import { globalStyles, colours } from "../consts";

type Props = {
	onPress: ( e: GestureResponderEvent ) => void;
	icon: React.FunctionComponent<SvgProps>;
	pos?: Styles;
}

const FloatingButton = ({ onPress, icon, pos }: Props) => {
	const Icon = icon;
	return(
		<TouchableOpacity
			style={[pos, styles.floatingButton]}
			onPress={ onPress }
		>
			<Icon
				pointerEvents={"none"}
				style={styles.vec} 	
				width={30} 
				height={30}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	floatingButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colours.primary,
		position: "absolute",
		right: 30,
		bottom: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "black",
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 1,
		elevation: 10,
	},
	vec: {
		color: "#FFFFFF",
	},
});

export default FloatingButton;
