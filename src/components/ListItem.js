import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
import NavigationBar from 'react-native-navbar-color';

export default class ListItem extends React.Component{

    
    
    constructor(props){
        super(props);
        this.state = {
            favoris: [],
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

    delete = async (routeName, item) => {
        let storedData = JSON.parse(await AsyncStorage.getItem(routeName));
        console.log('before Stored data', storedData);
        storedData = storedData.filter(el => !(el.product_name === item.product_name));
        if(routeName === 'Favoris') {
            await AsyncStorage.setItem('Favoris', JSON.stringify(storedData));
        } else {
            await AsyncStorage.setItem('Historique', JSON.stringify(storedData));
        }
        console.log('after Stored data', storedData );
    }

    componentDidMount(){
        // currentRouteName = this.state.navigationRef.current.getCurrentRoute().name;
        console.log('currentRouteName', this.props.routeName)

        //Change BottomTab backgroundColor
        NavigationBar.setStatusBarTheme('#ffab8e')
    }
    
    render() {
        return (
            <Card title={this.props.item.product_name}>
                <View>
                    <TouchableOpacity onPress={()=> this._onPress(this.props.item)}>
                        <Image 
                        source={{uri: this.props.item.image_small_url || this.props.item.image_ingredients_small_url }}
                        style={{ alignSelf: 'center', width: '100%', height: 150}}
                        />
                    </TouchableOpacity>
                    {(this.props.routeName === 'Favoris' || this.props.routeName === 'Historique') && (
                        <Button 
                        icon={
                            <Icon
                              name="trash"
                              size={25}
                              color="#000000"
                            />
                        }
                        iconLeft
                        title="" 
                        type="clear"
                        onPress={() => this.delete(this.props.routeName, this.props.item)}  
                    />) 
                    }
                    {(this.props.routeName != 'Favoris' && this.props.routeName != 'Historique') &&(
                        <Button 
                        icon={
                            <Icon
                              name="heart"
                              size={25}
                              color="#000000"
                            />
                        }
                        iconLeft
                        title="" 
                        type="clear"
                        onPress={() => this.favoris(this.props.item)}  
                    />) 
                    }
                </View>
            </Card>
            
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