import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import ListItem from '../components/ListItem'


class ListProduct extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            products: []
        }
    }
    componentDidMount(){
         fetch('https://fr.openfoodfacts.org/categorie/laits.json')
            .then((response) => response.json())
            .then((responseJson) => {

                // Change l'état du composant
                this.setState({
                    products: responseJson.products,
                });
        
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render(){
        // Affiche un loader tant que l'API n'a pas répondu
        if(!this.state.products){
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
                        data={this.state.products}
                        renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation}  />}
                        keyExtractor={({id}, index) => id}
                    />
                </SafeAreaView>
            );
        }

    }
}

export default ListProduct;