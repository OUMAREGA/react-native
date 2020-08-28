import React from 'react';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage, ActivityIndicator, SafeAreaView, FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';



class ListHistorique extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            tabCodeBar: [],
            historique: [],
            hist: []
        }
    }

    storage = async () => {
            const value = await AsyncStorage.getItem('Historique');
            
            if (value !== null) {
                this.setState({historique: JSON.parse(value)})
            }
        }


   delete = async (item, index) => {
    let historyData = JSON.parse(await AsyncStorage.getItem('Historique'));
    historyData = historyData.filter((el, i) => !(el.product_name + i === item.product_name + index));
    await AsyncStorage.setItem('Historique', JSON.stringify(historyData))
    this.setState({historique: historyData});
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

   list  = ({item, index}) => {
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
                    onPress={() => this.delete(item, index)}  
                />
            </View>
        </Card>
       )
   }

   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(this.state.historique.length === 0){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
               <Text style={{paddingLeft:20, paddingTop:20, color: 'tomato', fontSize: 20}}>Vous n'avez aucun produit dans l'historique</Text>
            </SafeAreaView>
        )
    }
    else{
        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                <Text style={{paddingLeft:20, paddingTop:20, color: 'tomato', fontSize: 20}}>Mes historiques</Text>
                <FlatList
                    data={this.state.historique}
                    renderItem={(item, index) => this.list(item, index)}
                    keyExtractor={({id}, index) => id+index}
                />
            </SafeAreaView>
        );
    }

}
}

export default ListHistorique;