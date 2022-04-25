import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { colours, RootStackParamList, vw, vh, globalStyles } from "../consts";
import firestore from "@react-native-firebase/firestore";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Slider } from '@miblanchard/react-native-slider';

type Props = NativeStackScreenProps<RootStackParamList, "Add">;

const AddScreen = ({ route, navigation }: Props) => {

	const initLat = 51.7550;
	const initLong = -1.2593;

	const [ pubName, setPubName ] = useState("");
	const [ markerLoc, setMarkerLoc ] = useState({ 
													latitude: initLat, 
													longitude: initLong 
												 });
	const [ vibes, setVibes ] = useState(5);

	const pubCollection = firestore().collection('pubs');
	const visitsCollection = firestore().collection('visits');

	const nameInput = useRef() as React.RefObject<TextInput>;

	function addPub() {
		pubCollection.add({
			name: pubName,
			lat: markerLoc.latitude,
			long: markerLoc.longitude,
		});
		visitsCollection.add({
		});

		navigation.navigate("Home", { userId: route.params.userId });
	}

	return (
		<>
		<StatusBar barStyle="dark-content" />
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.container}>
				<View style={globalStyles.inputView}>
					<TextInput 
						style={globalStyles.textInput} 
						placeholder="name"
						placeholderTextColor={ colours.primaryLight }
						onChangeText={ text => { setPubName(text) } }
						ref={nameInput}	
					/>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>location</Text>
				</View>
				<View style={styles.mapContainer}>
					<MapView 
						provider={ PROVIDER_GOOGLE } // remove if not using Google Maps
						style={styles.map}
						initialRegion={{
							latitude: markerLoc.latitude,
							longitude: markerLoc.longitude,
							latitudeDelta: 0.0040,
							longitudeDelta: 0.0040,
						}}
						rotateEnabled={false}
						onPoiClick={ e => {
							setMarkerLoc(e.nativeEvent.coordinate);
							setPubName(e.nativeEvent.name);
							nameInput.current?.setNativeProps({ text: e.nativeEvent.name })
						} }
					>
						<Marker	
							coordinate={{
											latitude: markerLoc.latitude, 
											longitude: markerLoc.longitude
									   }}
							draggable={true}
							onDragEnd={ e => { } }
							pinColor={colours.primary}
						>
						</Marker>
					</MapView>
				</View>
				<View style={styles.sliderContainer}>
					<View style={styles.labelContainer}>
						<Text style={styles.label}>vibes:</Text> 
						<Text style={globalStyles.monospaceBlock}>{vibes}</Text>
					</View>
					<Slider 
						value={vibes}	
						minimumValue={0}
						maximumValue={10}
						step={1}
						trackClickable={true}
						trackMarks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
						renderTrackMarkComponent={ e => {
							return (
							<View style={{ 
								width: 5, 
								height: 10, 
								marginLeft: 8,
								backgroundColor: e >= vibes ? colours.primaryXLight : colours.primary
								}}>
							</View>
							);
						}}
						trackStyle={{ marginLeft: 8, marginRight: 8 }}
						thumbTintColor={colours.primary}
						minimumTrackTintColor={colours.primary}
						maximumTrackTintColor={colours.primaryXLight}
						onValueChange={ value => {setVibes(value)} }
					/>
				</View>
				<TouchableOpacity 
					style={globalStyles.submitButton}
					onPress={ () => addPub() }
				>
					<Text style={globalStyles.buttonText}>add pub</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		backgroundColor: colours.bg,
	},
	map: {
		width: 80*vw,
		height: 80*vw,
	},
	mapContainer: {
		borderRadius: 15,
		width: 80*vw,
		height: 80*vw,
		margin: 10,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: colours.primary,
	},
	sliderContainer: {
		margin: 10,
		height: 50,
		width: 80*vw,
		alignItems: "stretch",
		justifyContent: "center"
	},
	labelContainer: {
		marginTop: 15,
		marginLeft: 10,
		width: 80*vw+8,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		color: colours.primaryXLight,
		flex: 1
	}
});

export default AddScreen;
