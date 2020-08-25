import React from 'react';
import { Button } from 'react-native-elements';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text} from 'react-native';

import Scan from '../components/Scan'


class Home extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            historique: []
        }
    }
    
    render(){
        return(
            <View>
    
               <Button
                    title="Scanner un produit"
                    onPress={() => this.props.navigation.navigate('Scan')}
                />
                <Button
                    title="Historique des scans"
                    onPress={() => this.props.navigation.navigate('Historique')}
                />
                <Button
                    title="Mes Favoris"
                    onPress={() => this.props.navigation.navigate('Favoris')}
                />
            
            </View>
        );
    }
}

export default Home;