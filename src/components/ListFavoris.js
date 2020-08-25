import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';

  
import React from 'react';

class ListFavoris extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            favoris: []
        }
    }
    render(){
        return(
            <Text>ListFavoris</Text>
        );
    }
}

export default ListFavoris;