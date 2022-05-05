import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import	{	View, 
			SafeAreaView, 
			StyleSheet, 
			StatusBar,
			FlatList,
			Text,
			ImageBackground,
			Image,
		} from "react-native";
import Plus from "../../assets/plus.svg";
import FloatingButton from '../components/FloatingButton';
import { getPubs, colours, globalStyles, RootStackParamList, vw } from '../consts';
import LinearGradient from "react-native-linear-gradient";
import image from "../../assets/genPub.jpg";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;



const HomeScreen = ({ route, navigation }: Props) => {


	const [ pubs, setPubs ] = useState<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | null>();

	useEffect( () => {
		getPubs(setPubs);
	});

	function renderTile({ item, index, separators }) {
		return (
			<>
				<View style={styles.tile}>
					<ImageBackground
						source={{ uri: Image.resolveAssetSource(image).uri }}
						style={styles.tileImage}
					>
						<LinearGradient
							colors={["#000000c0", "#00000000"]}
							style={styles.tileGradient}
						>
							<Text style={styles.tileLabel}>
								{item.data().name}
							</Text>
						</LinearGradient>
					</ImageBackground>
				</View>
			</>
		);
	}

	return (
		<>
		<StatusBar backgroundColor={ colours.bg } barStyle="light-content" />
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.header}> Pubs</Text>
				</View>
				<FlatList 
					contentContainerStyle={styles.listContainer}
					data={ pubs?.docs }
					renderItem={renderTile}
					keyExtractor={ item => item.id }
				>
				</FlatList>
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
		</>
    );
}

const styles = StyleSheet.create({
	add: {
		position: "absolute",
		right: 30,
		bottom: 30,
	},
	header: {
		color: colours.text,
		fontSize: 30,
		fontWeight: "700",
		alignSelf: "flex-start",
		margin: 20,
		marginBottom: 0,
	},
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: colours.bg,
		display: "flex",
		alignItems: "center",
	},
	vec: {
		color: "#FFFFFF",
	},
	listContainer: {
		width: "80%",
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
	},
	tile: {
		height: 100,
		width: 80*vw,
		margin: 10,
		backgroundColor: "red",
		borderRadius: 20,
		display: "flex",
	},
	tileGradient: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
		overflow: "hidden",
		borderRadius: 20,
	},
	tileLabel: {
		color: colours.text,
		fontSize: 18,
		marginLeft: 20,
		marginBottom: 10,
		fontWeight: "500",
	},
	tileImage: {
		width: "100%",
		height: 100,
		overflow: "hidden",
		borderRadius: 20,
	}
});

export default HomeScreen;
