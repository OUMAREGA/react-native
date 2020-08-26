import React from 'react';
import { AsyncStorage } from 'react-native';

import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import ListItem  from './ListItem';


class ListHistorique extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            tabCodeBar: [],
            historique: []
        }
    }

    storage = async () => {
            const value = await AsyncStorage.getItem('Historique');
            this.setState({
                tabCodeBar: JSON.parse(value) 
            })
            if (value !== null) {
              console.log(value);
            }

            this.state.tabCodeBar.forEach(code => {
                fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`) 
                .then((response) => response.json())
                .then( async (responseJson) => {
            
                    this.setState({
                            historique: [...this.state.historique, responseJson.product]
                        });
                })
                
            });


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
                <Text >Mes historiques</Text>
                <FlatList
                    data={this.state.historique}
                    renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation}  />}
                    keyExtractor={({id}, index) => id}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListHistorique;