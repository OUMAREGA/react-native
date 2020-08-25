import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';


class ListProduct extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            product: []
        }
    }
    render(){
        return(
                <Text>Products</Text>
        );
    }
}

export default ListProduct;