import React from 'react';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage, ActivityIndicator, SafeAreaView, FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import ListItem  from './ListItem';


class ListFavoris extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            favoris: []
        }
    }

    _onPress(item){

        this.props.navigation.navigate('Details', 
            {
                product: item
            }
        );
    }

    favoris = async (item) => {
    
        try {
            let favoris = JSON.parse(await AsyncStorage.getItem('Favoris'));

            

            if (favoris === null || favoris >= 0) {
                favoris = [];
            }

            if(!(favoris.find(element => item.product_name === element.product_name))) {
                favoris.push(item);
                await AsyncStorage.setItem('Favoris', JSON.stringify(favoris));
                console.log("favoris",favoris)
            }
        } catch (e) {
            console.error(e);
        }
    }

    delete = async (item) => {
        let favorisData = JSON.parse(await AsyncStorage.getItem('Favoris'));
        favorisData = favorisData.filter(el => !(el.product_name === item.product_name));
        await AsyncStorage.setItem('Favoris', JSON.stringify(favorisData))
        this.setState({favoris: favorisData});
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
    this.focusListener = this.props.navigation.addListener("focus", () => {
        // The screen is focused
        // Call any action
        this.storage()
      });
}

componentWillUnmount() {
this.focusListener();
}

   list  = ({item}) => {
       return (
        <Card title={item.product_name}>
            <View>
                <TouchableOpacity onPress={()=> this._onPress(item)}>
                    <Image 
                    source={{uri: item.image_small_url || item.image_ingredients_small_url }}
                    style={{ alignSelf: 'center', width: '100%', height: 150}}
                    />
                </TouchableOpacity>
                    <Button 
                    icon={
                        <Icon
                        name="trash"
                        size={25}
                        color="red"
                        />
                    }
                    iconLeft
                    title="" 
                    type="clear"
                    onPress={() => this.delete(item)}  
                />
            </View>
        </Card>
    )
   }

   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(this.state.favoris.length === 0){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
               <Text style={{paddingLeft:20, paddingTop:20, color: 'tomato', fontSize: 20}}>Vous n'avez aucun favoris</Text>
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
                    keyExtractor={({id}, index) => id+index}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListFavoris;