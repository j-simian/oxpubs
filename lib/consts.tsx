import { StyleSheet, Dimensions } from "react-native";

export const vw = Dimensions.get("window").width / 100.0;
export const vh = Dimensions.get("window").height / 100.0;

export type RootStackParamList = {
	Login: undefined;
	Home: { userId: string };
	Add: { userId: string };
};

type Colour = `#${string}`;

export var colours = {
	bg: "#002147" as Colour,
	bgO: "#023047" as Colour,
	primary: "#219EBC" as Colour,
	primaryLight: "#8ECAE6" as Colour,
	primaryXLight: "#C6EDFF" as Colour,
	secondary: "#FB8500" as Colour,
	secondaryLight: "#FFB703" as Colour,
	secondaryXLight: "#FFDB81" as Colour,
	text: "#FFFFFF" as Colour,
	textFaded: "#CCCCCC" as Colour,
}

export var globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		backgroundColor: colours.bg,
	},
	inputView: {
		width: "80%",
		alignItems: "center",
		height: 40,
		padding: 0,
		marginBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: colours.primary
	},
	textInput: {
		width: "100%",
		flex: 1,
		padding: 10,
		color: colours.primaryXLight,
	},
	submitButton: {
		backgroundColor: colours.secondary,
		width: 100,
		height: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10
	},
	buttonText: {
		color: colours.text,
	}
});
