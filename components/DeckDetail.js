import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Pressable,  } from 'react-native';
import Deck from './Deck';
import { white, purple } from '../utils/colors'
import {connect} from 'react-redux'
class  DeckDetails extends Component {
  render() {

 const {id} = this.props
        return (
            <View  style={ [styles.container ] }>      
                <View  >     
                   <Pressable  style={ [styles.card ] }>
                      <Deck id={id}/>
                    </Pressable>
                </View>
                <View style={styles.center}>
                    <Button                  
                    title="Add Card"
                    color="#00834e"                    
                    onPress={() => this.props.navigation.navigate("AddCard", {id})}
                    />
                </View>
                  <View style={styles.center}>                    
                     <Button                  
                        title=" Start Quiz"
                        color="#00834e"              
                      onPress={() => this.props.navigation.navigate("Quiz",{id})}
                    />
                </View>
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
    card: {
    backgroundColor: white,
    borderRadius: 9,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
    center: {
      marginTop:10,
  },
  
})

function mapStateToProps({decks }, {route}) {
    const { id } = route.params   
    return {        
      decks,
      id
    }
}

export default connect(mapStateToProps)(DeckDetails)