import React, {Component} from 'react';
import { StyleSheet, Text, View,  Pressable,Button  } from 'react-native';
import { white, purple } from '../utils/colors'
import { connect } from 'react-redux'
import Deck from './Deck';
import {handleInitialData} from '../actions/index'
import { getDecks } from '../utils/api';

class DecksList extends Component {
  componentDidMount() {
   
    const { dispatch } = this.props   
    dispatch(handleInitialData())
  
  }
  render() {         
     
    const { decks, deckIds } = this.props
    return (
          <View style={styles.center} >            
              { deckIds.map((id) => (
                <Pressable style={[styles.card]} key={id} onPress={() => this.props.navigation.navigate('DeckDetail', {id:id})}>                      
                       <Deck id={id}/>                     
                </Pressable>
                ))}
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
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  
})

function mapStateToProps({ decks }) {
  
    const deckIds = Object.keys(decks).sort((a, b) => decks[b].timestamp - decks[a].timestamp)  
    
    return {        
         decks,
         deckIds,
    }
}
export default connect(mapStateToProps) (DecksList)