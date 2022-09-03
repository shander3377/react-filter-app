import React from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filter1";
import Filter2 from "./filter2";
import Filter3 from "./filter3";
import Filter4 from "./filter4";
import Filter5 from "./filter5";
import Filter6 from "./filter6";
import Filter7 from "./filter7";
import Filter8 from "./filter8";
import Filter9 from "./filter9";
import Filter10 from "./filter10";

let Data = {
	regular: [
		{
			id: "1",
			image: require("../assets/glasses.png"),
		},
	],
	wayfarer: [
		{
			id: "4",
			image: require("../assets/Frapp-03.png"),
		},
		{
			id: "5",
			image: require("../assets/Frapp-04.png"),
		},
	],
	rimless: [
		{
			id: "10",
			image: require("../assets/Frapp-09.png"),
		},
	],
	round: [
		{
			id: "2",
			image: require("../assets/glasses-round.png"),
		},
		{
			id: "3",
			image: require("../assets/Frapp-02.png"),
		},
	],
	aviator: [
		{
			id: "6",
			image: require("../assets/Frapp-05.png"),
		},
		{
			id: "7",
			image: require("../assets/Frapp-06.png"),
		},
		{
			id: "8",
			image: require("../assets/Frapp-07.png"),
		},
		{
			id: "9",
			image: require("../assets/Frapp-08.png"),
		},
	],
};
export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
			selected: "regular",
			currentFilter: "Filter2",
		};
	}
	componentDidMount() {
		var test = {
			faces: [
				{
					BOTTOM_MOUTH: [Object],
					LEFT_CHEEK: [Object],
					LEFT_EAR: [Object],
					LEFT_EYE: [Object],
					LEFT_MOUTH: [Object],
					NOSE_BASE: [Object],
					RIGHT_CHEEK: [Object],
					RIGHT_EAR: [Object],
					RIGHT_EYE: [Object],
					RIGHT_MOUTH: [Object],
					bounds: [Object],
					rollAngle: 2.6811561584472656,
					yawAngle: 343.04413986206055,
				},
			],
			target: 59,
			type: "face",
		};

		Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
	}

	onCameraPermission = (status) => {
		this.setState({ hasCameraPermission: status.status === "granted" });
	};

	onFacesDetected = (faces) => {
		// console.warn("Hello");
		// console.log("Hello");
		// console.warn(faces);
		// faces.forEach((face) => {

		// })
		// console.warn(faces["faces"][0]["bounds"]);
		if (faces["faces"][0]) {
			var faceHeight = faces["faces"][0]["bounds"]["size"]["height"];
			var faceWidth = faces["faces"][0]["bounds"]["size"]["width"];
			var leftEyePosition = faces["faces"][0]["LEFT_EYE"];
			var rightEyePosition = faces["faces"][0]["RIGHT_EYE"];
			// console.warn("height: " + height);
			// console.warn("width: " + width);
			// console.warn("lefteyepos: " + lefteyepos);
			// console.warn("righteyepos: " + righteyepos);

			// {"origin": {"x": 5.454545454545496, "y": 201.6767676767677}, "size": {"height": 260.55555555555554, "width": 279.6363636363636}}
			this.setState({ faces: faces["faces"] });
			console.warn(this.state.faces.length);

			// console.warn(this.state.faces["faces"])

			// console.warn(this.state.faces[0]["faces"][0]["bounds"]["size"]["height"])
		}
	};

	onFaceDetectionError = (error) => {
		console.warn(error);
	};

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		}
		if (hasCameraPermission === false) {
			return (
				<View style={styles.container}>
					<Text>No access to camera</Text>
				</View>
			);
		}
		// console.log(this.state.faces);
		return (
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.headingContainer}>
					<Text style={styles.titleText}>FRAPP</Text>
				</View>
				<View style={styles.cameraStyle}>
					<Camera
						style={{ flex: 1 }}
						type={Camera.Constants.Type.back}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all, //detect face features such as nose, eyes etc.
							runClassfication: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>

					{this.state.faces.map((face) => {
						// console.warn("hello")
						// console.warn(face);
						if (face) {
							if (this.state.currentFilter == "Filter1") {
								console.warn("Hello");
								return <Filter1 face={face} />;
							} else if (this.state.currentFilter == "Filter2") {
								console.warn("Hello");
								return <Filter2 face={face} />;
							} else if (this.state.currentFilter == "Filter3") {
								console.warn("Hello");
								return <Filter3 face={face} />;
							} else if (this.state.currentFilter == "Filter4") {
								console.warn("Hello");
								return <Filter4 face={face} />;
							} else if (this.state.currentFilter == "Filter5") {
								console.warn("Hello");
								return <Filter5 face={face} />;
							} else if (this.state.currentFilter == "Filter6") {
								console.warn("Hello");
								return <Filter6 face={face} />;
							} else if (this.state.currentFilter == "Filter7") {
								console.warn("Hello");
								return <Filter7 face={face} />;
							} else if (this.state.currentFilter == "Filter8") {
								console.warn("Hello");
								return <Filter8 face={face} />;
							} else if (this.state.currentFilter == "Filter9") {
								console.warn("Hello");
								return <Filter9 face={face} />;
							} else if (this.state.currentFilter == "Filter10") {
								console.warn("Hello");
								return <Filter10 face={face} />;
							}
						}
					})}
				</View>
				<View style={styles.filterContainer}>
					<View style={styles.categoryContainer}>
						{Object.keys(Data).map((d) => {
							console.warn(d);
							return (
								<TouchableOpacity
									style={
										this.state.selected == d
											? styles.categoryBoxSelected
											: styles.categoryBox
									}
									onPress={() => {
										this.setState({ selected: d });
									}}
								>
									<Text style={styles.fitlerText}>{d}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					<ScrollView
						style={styles.actionScrolls}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{Data[this.state.selected].map((data) => {
							return (
								<TouchableOpacity
									style={styles.actionButton}
									onPress={() => {
										this.setState({ currentFilter: `Filter${data.id}` });
									}}
								>
									<Image style={styles.frameImage} source={data.image} />
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	headingContainer: {
		flex: 0.1,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 30,
	},
	cameraStyle: {
		flex: 0.65,
	},
	filterContainer: {
		flex: 0.2,
		paddingLeft: RFValue(15),
		paddingRight: RFValue(15),
		paddingtTop: RFValue(30),
		backgroundColor: "teal",
	},
	filterImageContainer: {
		alignItems: "center",
		height: RFPercentage(8),
		width: RFPercentage(15),
		borderRadius: 30,
		marginRight: 30,

		justifyContent: "center",
		backgroundColor: "orange",
	},
	categoryContainer: {
		flex: 0.8,
		flexDirection: "row",
		marginBottom: RFValue(2),
		alignItems: "center",

		justifyContent: "center",
		backgroundColor: "orange",
	},
	categoryBox: {
		flex: 0.2,
		marginBottom: RFValue(2),
		alignItems: "center",
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: "white",
		margin: 1,
		width: "80%",
		padding: RFValue(3),
	},
	categoryBoxSelected: {
		flex: 0.2,
		alignItems: "center",
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: "orange",
		margin: 1,
		width: "100%",
		padding: RFValue(3),
	},
	actionScrolls: {
		flexDirection: "row",
	},
	fitlerText: {
		fontSize: 11,
	},
	actionButton: {
		alignItems: "center",
		height: RFPercentage(8),
		width: RFPercentage(15),
		borderRadius: 30,
		marginRight: 30,
		justifyContent: "center",
		backgroundColor: "orange",
	},
	frameImage: {
		height: 32,
		width: 80,
	},
});
