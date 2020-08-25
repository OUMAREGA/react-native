import React from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import style from '../style';

const handleBarCodeScanned = ({ type, data }) => {
   this.setState = {
       scanned: true
   }
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

export default class Scan extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
        scanned: false
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        //const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View>
                <Camera
                    style={style.preview}
                    ref={camera => this.camera = camera}
                    onBarCodeScanned={this.state.scanned ? undefined : handleBarCodeScanned}

                />
            </View>
        );
    };
};