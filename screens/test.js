import {
	Text,import React from "react";
	import {
		StyleSheet,
		Text,
		View,
		SafeAreaView,
		StatusBar,
		Platform,
		Image,
	} from "react-native";
	import { Camera } from "expo-camera";
	import * as Permissions from "expo-permissions";
	import * as FaceDetector from "expo-face-detector";
	import Filter1 from "./filter1.js";
	export default class Main extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				hasCameraPermission: null,
				faces: [],
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
				this.setState({ faces: [faces] });
				// console.warn(this.state.faces[0]["faces"][0]["bounds"]["size"]["height"])
			}
		};
	
		onFaceDetectionError = (error) => {
			console.log(error);
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
							type={Camera.Constants.Type.front}
							faceDetectorSettings={{
								mode: FaceDetector.FaceDetectorMode.fast,
								detectLandmarks: FaceDetector.FaceDetectorLandmarks.all, //detect face features such as nose, eyes etc.
								runClassfication: FaceDetector.FaceDetectorClassifications.all,
							}}
							onFacesDetected={this.onFacesDetected}
							onFacesDetectionError={this.onFacesDetectionError}
						/>
	
						{this.state.faces.map((face) => {
							if (this.state.faces[0]["faces"][0]["bounds"]["size"]["height"]) {
							
								return (
									<Filter1
										face={this.state.faces[0]["faces"][0]}
									/>
								);
							}
						})}
					</View>
					<View style={styles.filterContainer}></View>
					<View style={styles.actionContainer}></View>
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
		filterContainer: {},
		actionContainer: {},
	});
	
	View,
	SafeAreaView,
	Platform,
	StatusBar,
	StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";

export default class Maien extends Component {
	constructor(props) {
		super(props);
		this.state = { hasCameraPermssion: null, faces: [] };
	}
	componentDidMount = async () => {
		console.warn("yes");
		await Camera.requestCameraPermissionsAsync().then(this.getCamPerms);
	};
	getCamPerms = (status) => {
		console.warn(status.status);
		this.setState({ hasCameraPermssion: status.status === "granted" });
	};
	handleFaceDetection = (data) => {
		console.warn(data);
		this.setState({ faces: data });
	};
	handleFaceDetectionError = (e) => {
		console.warn(e);
	};
	render() {
		return (
			<View style={styles.container}>
				{/* <SafeAreaView style={styles.safearea}> */}
				<View style={styles.titleContainer}>
					<Text style={styles.title}>FRAPP</Text>
					<Text style={styles.subHeading}>Try our frames!</Text>
                    <Camera
						type={Camera.Constants.Type.front}
						onFacesDetected={this.handleFaceDetection}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all, //detect face features such as nose, eyes etc.
							runClassfication: FaceDetector.FaceDetectorClassifications.all, //detect mood, emotions like smile, frown, sob etc.
						}}
						onFaceDetectionError={this.handleFaceDetectionError}
					/>
				</View>
				{/* <View style={styles.cameraContainer}> */}
				
				{/* </View> */}

				{/* </SafeAreaView> */}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 30,
	},
	subHeading: {
		fontSize: 20,
		color: "blue",
	},
	safearea: {
		marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
	},
	cameraContainer: {
		flex: 0.65,
	},
});
