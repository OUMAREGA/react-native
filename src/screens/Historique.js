import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import ListHistorique from '../components/ListHistorique';


class Historique extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            historique: []
        }
    }
    render(){
        return(
                <ListHistorique navigation={this.props.navigation} />
        );
    }
}

export default Historique;