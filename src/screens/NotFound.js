import React from 'react';
import { View, Text} from 'react-native';


class NotFound extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View>
                <Text>Produit {this.props.route.params.codeBar} non trouvé</Text>
            </View>
        );
    }
}

export default NotFound;