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
            
            if (value !== null) {
                this.setState({
                    tabCodeBar: JSON.parse(value) 
                })

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

   }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            this.storage()
          });
   }

   componentWillUnmount() {
    this.focusListener();
  }

   list  = ({item}) => <ListItem item={item} navigation={this.props.navigation} routeName='Historique' />

   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(this.state.historique.length === 0){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
               <Text>Vous avez zéro scan</Text>
            </SafeAreaView>
        )
    }
    else{
        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                <Text style={{paddingLeft:20, paddingTop:20, color: 'tomato', fontSize: 20}}>Mes historiques</Text>
                <FlatList
                    data={this.state.historique}
                    renderItem={(item) => this.list(item)}
                    keyExtractor={({id}, index) => id}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListHistorique;