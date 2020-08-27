import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import ListProduct from '../components/ListProduct';


class Products extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            products: []
        }
    }
    

    render(){
        return(
            <View>
                <ListProduct/>
            </View>
        );
    }
}

export default Products;