import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import {Styles} from 'react-native-svg';
import { globalStyles, colours, sleep } from "../consts";

type Props = {
	placeholder: string,
	data: string[],
	value: string,
	stateCallback: ( e: string ) => void
}

const TextPicker = ({ placeholder, data, value, stateCallback }: Props) => {
	
	const [ listVisible, setListVisible ] = useState(false);


	return (
		<View style={styles.textPickerContainer} >
			<TextInput
				style={[ globalStyles.textInput, { width: "100%" } ]}
				placeholder={ placeholder }
				placeholderTextColor={ colours.primaryLight }
				value={value}
				onFocus={ () => { setListVisible(true) } }
				onChange={ e => { stateCallback(e.nativeEvent.text) } }
			/>
			<View 
				style={[
					styles.listContainer,
					{display: listVisible ? null : "none"} as Styles
				]}
			>
				{ data?.map((item) => (
					<TouchableOpacity 
						key={item}
						style={styles.listItem}
						onPress={ () => { 
							stateCallback(item);
							sleep(100);
							setListVisible(false);
						} }
					>
						<Text style={styles.listText}>{ item }</Text>
					</TouchableOpacity> 
				)) }
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	textPickerContainer: {
		width: "80%",
		alignItems: "center",
		padding: 0,
		marginBottom: 10,
		borderBottomColor: colours.primary,
	},
	listContainer: {
		width: "100%",
		shadowColor: "black",
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 1,
		elevation: 10,
	},
	listItem: {
		backgroundColor: colours.primaryXLight,
		width: "100%",
		textAlign: "center",
		padding: 5,
		height: 30,
		borderRadius: 0,
	},
	listText: {
		color: colours.primary,
	}
});

export default TextPicker;
