import React from 'react';
import { AsyncStorage } from 'react-native';

import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import ListItem  from './ListItem';


class ListFavoris extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            favoris: []
        }
    }

    storage = async () => {
            const value = await AsyncStorage.getItem('Favoris');
            
            if (value) {

                this.setState({
                    favoris: JSON.parse(value)
                })
              
            } 
            
            console.log('favoris', this.state.favoris)
        
   }

    componentDidMount(){
        this.storage();
   }

   list  = ({item}) => <ListItem item={item} navigation={this.props.navigation} routeName='Favoris' />

   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(this.state.favoris.length === 0){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
               <Text>Vous avez zéro favoris</Text>
            </SafeAreaView>
        )
    }
    else{
        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                <Text style={{paddingLeft:20, paddingTop:20, color: 'tomato', fontSize: 20}}>Mes Favoris</Text>
                <FlatList
                    data={this.state.favoris}   
                    renderItem={(item) => this.list(item)}
                    keyExtractor={({id}, index) => id}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListFavoris;