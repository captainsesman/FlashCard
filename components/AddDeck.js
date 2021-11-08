import React, {Component} from 'react';
import { StyleSheet, Button ,Text, View, SafeAreaView,  TextInput} from 'react-native';
import { white, purple } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

class AddDeck extends Component {

     state = {
            input: ""
        }
        onChangeInput = (input) => {
            this.setState({
            input,
            })
        }
    

     submitDeck = () => {
        const { navigation, dispatch } = this.props;
         const { input } = this.state;
         const title = input
        const deck = {
        title: input,
        questions: []
         }
        
         dispatch(addDeck(deck))
         saveDeck({title , deck })
         

         this.setState(() => ({ input: '' }));
     //Save To DB
        
        navigation.goBack()
    }
    

    render() {
        const { input } = this.state;
        
        return (
            <View style={[styles.container]}>   
                <SafeAreaView>
                    <Text>
                        What is the Title of Your Deck?
                    </Text>
                  
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Deck Title"
                        value={input}
                        onChangeText={ this.onChangeInput}
                    />
                    
                      <Button                  
                        title=" Create Deck"
                        color="#00834e"
                         onPress={this.submitDeck}
                     />
                    </SafeAreaView>
          
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    center: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})

export default connect() (AddDeck)