import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';

  
import React from 'react';
import ListFavoris from '../components/ListFavoris';

class Favoris extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            favoris: []
        }
    }
    render(){
        return(
            <ListFavoris navigation={this.props.navigation} />
        );
    }
}

export default Favoris;