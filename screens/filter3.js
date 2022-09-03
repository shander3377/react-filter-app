import React from "react";
import { Image, View, Text } from "react-native";
// var height = faces["faces"][0]["bounds"]["size"]["height"];
// var width = faces["faces"][0]["bounds"]["size"]["width"];
// var lefteyepos = faces["faces"][0]["LEFT_EYE"];
// var righteyepos = faces["faces"][0]["RIGHT_EYE"];
const Filter3 = (props) => {
	console.warn(props["face"])
	var faceHeight = props["face"]["bounds"]["size"]["height"];
	var faceWidth = props["face"]["bounds"]["size"]["width"];
	var leftEyePosition = props["face"]["LEFT_EYE"];
    var rightEyePosition = props["face"]["RIGHT_EYE"];
        const glassesWidth = faceWidth
    const glassesHeight = faceHeight / 3
    const transformAngle = (
        angleRad = Math.atan(
            (rightEyePosition.y - leftEyePosition.y) /
            (rightEyePosition.x - leftEyePosition.x)
        )
    ) => angleRad * 180 / Math.PI
    return (
        <View style={{
            position: 'absolute',
            left: leftEyePosition.x - glassesWidth * 0.345,
            top: leftEyePosition.y - glassesHeight * 0.5
        }}>
            <Image
                source={require('../assets/Frapp-02.png')}
                style={{
                    width: glassesWidth,
                    height: glassesHeight,
                    resizeMode: 'contain',
                    transform: [{ rotate: `${transformAngle()}deg` }]
                }}
            />
        </View>
    );
};

export default Filter3