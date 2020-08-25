import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';


class ListHistorique extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            historique: []
        }
    }
    render(){
        return(
                <Text>historique</Text>
        );
    }
}

export default ListHistorique;