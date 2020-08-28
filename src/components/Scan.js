import React from 'react';
import { View, Text, Button,Vibration, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';


import style from '../style';


export default class Scan extends React.Component {
   

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            flashMode: Camera.Constants.FlashMode.off,
            scanned: false,
            productScanned: []
        };
    }

    camera = null;

   

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        //const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    // initalization
    handleBarCodeScanned = async ({ type, data }) => {
        this.setState( {
         scanned: true
     });

     Vibration.vibrate();

     //get product
     fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`) 
     .then((response) => response.json())
     .then( async (responseJson) => {

         if(responseJson.status_verbose === "product not found" || responseJson.status_verbose === "no code or invalid code"){
            this.props.navigation.navigate('NotFound', {
                codeBar: data
            });
         }
         else
         {

            try {
                let getHistorique = JSON.parse(await AsyncStorage.getItem('Historique'));
    
                
    
                if (getHistorique === null || getHistorique >= 0) {
                    getHistorique = [];
                }

                    getHistorique.push(responseJson.product);
                    this.setState({productScanned: getHistorique})
                    await AsyncStorage.setItem(
                          'Historique',
                          JSON.stringify(this.state.productScanned)
                        );
                        
            } catch (e) {
                console.error(e);
            }

            this.props.navigation.navigate('Details', {
                product: responseJson.product
            });   
            
         }
     })

    };
     
    changeFlash = () => {
        this.state.flashMode === Camera.Constants.FlashMode.torch ? 
        this.setState({flashMode: Camera.Constants.FlashMode.off}) :
        this.setState({flashMode: Camera.Constants.FlashMode.torch})
     }

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
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    flashMode={this.state.flashMode}
                >
                    <ImageBackground source={require('../../assets/scan_cadre.png')} resizeMode='cover' style={{width: 400, height: 400}}></ImageBackground>
                </Camera>
            
                    <Button style={{paddingTop: 100} } title={'Flash'} onPress={()=> this.changeFlash()} />
                    <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} />
            </View>
        );
    };
};