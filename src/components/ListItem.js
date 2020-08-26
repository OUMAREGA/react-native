import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';


export default class ListItem extends React.Component{
    
    _onPress(item){

        this.props.navigation.navigate('Details', 
            {
                product: item
            }
        )
        
        /*
        // Variante de navigate si je veux aller dans une autre pile de navigation
        // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
        this.props.navigation.navigate('Details', {
            screen: 'Details',
            params: { product: item },
        });
        */
    }
    
    render() {
        return (
            <View style={styles.lineContainer}>
                <TouchableOpacity onPress={()=> this._onPress(this.props.item)}>
                    <Text>{this.props.item.product_name}</Text>
                    <Image 
                    source={{uri: this.props.item.image_small_url || this.props.item.image_ingredients_small_url }}
                    style={{ alignSelf: 'center', width: '100%', height: 150}}
                    />
                    <Button title="Mettre en favoris" ></Button>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }
});