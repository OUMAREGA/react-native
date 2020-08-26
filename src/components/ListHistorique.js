import React from 'react';
import { AsyncStorage } from 'react-native';

import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';


class ListHistorique extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            historique: []
        }
    }

    storage = async () => {
            const value = await AsyncStorage.getItem('Historique');
            this.setState({
                historique: value
            })
            if (value !== null) {
              console.log(value);
            }
   }

    componentDidMount(){
        this.storage()
   }

   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(!this.state.historique){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </SafeAreaView>
        )
    }
    else{
        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.historique}
                    renderItem={({item}) => <Text>{item}</Text>}
                    keyExtractor={({id}, index) => id}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListHistorique;