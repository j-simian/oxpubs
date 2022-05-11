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
import image from "../../assets/no_img.jpg";
import {MAPS_API_KEY} from '../API_KEY';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type Photo = {
	height: number,
	width: number,
	html_attributions: string[],
	photo_reference: string
}

const HomeScreen = ({ route, navigation }: Props) => {

	const [ pubs, setPubs ] = useState<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | null>();
	const [ images, setImages ] = useState<Map<string, string>>(new Map());

	async function getImage(placeID: string) {
		var imageData: Photo;
		if(placeID) {
			let placePromise = await fetch(
				"https://maps.googleapis.com/maps/api/place/details/json" + 
				"?place_id=" + placeID + 
				"&key=" + MAPS_API_KEY +
				"&fields=photo"
			);
			await placePromise.json().then( json => {
				if(json?.result?.photos) {
					imageData = json.result.photos[0];
				}
			});
		}
		return imageData;
	}
	
	async function getImageURI(imageData: Photo) {
		if(imageData) {
			let image = await fetch(
				"https://maps.googleapis.com/maps/api/place/photo" + 
				"?photo_reference=" + imageData.photo_reference +
				"&key=" + MAPS_API_KEY + 
				"&maxwidth=" + Math.floor(80*vw)
			);
			return image.url;
		}
	}


	useEffect( () => {
		if(!pubs) {
			getPubs(setPubs);
		}
		const willFocusSubscription = navigation.addListener('focus', () => {
			setPubs(null);
		});	
	});

	function renderTile({ item, index, separators }) {
		if(typeof images.get(item.data().mapsID) == "undefined") {
			const imageData = getImage(item.data().mapsID);
			imageData.then( response => {
				if(response){ 
					return getImageURI(response);
				}
			}).then( response => {
				if(response) {
					console.log(response);
					setImages( images => 
						(new Map(images.set(item.data().mapsID, response)))
					);
				}
			});
		}
		return (
			<>
				<View style={styles.tile}>
					<ImageBackground
						source={{ 
							uri: images.get(item.data().mapsID) 
									|| Image.resolveAssetSource(image).uri
						}}
						style={styles.tileImage}
					>
						<LinearGradient
							colors={["#00000000", "#000000c0"]}
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
				{ pubs ? 
					<FlatList 
						contentContainerStyle={styles.listContainer}
						data={ pubs?.docs }
						renderItem={renderTile}
						keyExtractor={ item => item.id }
					/>
				: <Text>couldn't loads pubs</Text>}
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
