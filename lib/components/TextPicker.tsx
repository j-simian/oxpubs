import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import {Styles} from 'react-native-svg';
import { globalStyles, colours } from "../consts";

type Props = {
	placeholder: string,
	data: string[],
	value: string,
	stateCallback: ( e: string ) => void
}

const TextPicker = ({ placeholder, data, value, stateCallback }: Props) => {
	
	const [ listVisible, setListVisible ] = useState(false);


	return (
		<View 
			style={[
				styles.textPickerContainer, 
				{borderBottomWidth: listVisible ? 1 : 2}
			]}
		>
			<TextInput
				style={[ globalStyles.textInput, { width: "100%" } ]}
				placeholder={ placeholder }
				placeholderTextColor={ colours.primaryLight }
				value={value}
				onFocus={ () => { setListVisible(true) } }
				onBlur={ () => { setListVisible(false) } }
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
						style={styles.listItem}
						onPress={ () => { 
							stateCallback(item);
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
		marginTop: 15,
		width: "100%",
	},
	listItem: {
		backgroundColor: colours.primaryXLight,
		width: "100%",
		textAlign: "center",
		padding: 5,
		height: 30,
		borderRadius: 8,
	},
	listText: {
		color: colours.primary,
	}
});

export default TextPicker;
