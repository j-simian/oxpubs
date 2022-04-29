import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {useId} from 'react';
import	{	View, 
			SafeAreaView, 
			TouchableOpacity, 
			StyleSheet } from "react-native";
import Plus from "../../assets/plus.svg";
import FloatingButton from '../components/FloatingButton';
import { colours, globalStyles, RootStackParamList } from '../consts';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation }: Props) => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.container}>
				<FloatingButton
					onPress={ () => { 
						navigation.navigate("Add", 
							{ userId: route.params.userId }) 
					} }
					icon={Plus}
					pos={styles.add}
				/>
			</View>				
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
	add: {
		position: "absolute",
		right: 30,
		bottom: 30,
	},
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: colours.bg,
	},
	vec: {
		color: "#FFFFFF",
	},
});

export default HomeScreen;
