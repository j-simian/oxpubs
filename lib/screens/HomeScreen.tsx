import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {useId} from 'react';
import	{	View, 
			SafeAreaView, 
			TouchableOpacity, 
			StyleSheet } from "react-native";
import Plus from "../../assets/plus.svg";
import { colours, globalStyles, RootStackParamList } from '../consts';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation }: Props) => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.container}>
				<TouchableOpacity 
					style={styles.floatingButton}
					onPress={ () => { 
						navigation.navigate("Add", 
							{ userId: route.params.userId }) 
					} }
				>
					<Plus 
						pointerEvents={"none"}
						style={styles.vec} 	
						width={30} 
						height={30}
					/>
				</TouchableOpacity>
			</View>				
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: colours.bg,
	},
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

export default HomeScreen;
