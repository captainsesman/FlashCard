import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux'

class Deck extends Component {

  render() {
   
    const { deck, numberOfQuestions } = this.props    
  
        return (
            
              <View style={styles.metricCounter  }>
                  <Text style={{ fontSize: 24, textAlign: 'center' }}>{ deck.title}</Text>
                    <Text> {`${ numberOfQuestions} of Cards`}</Text>
              </View>
          
        )
    }
}

const styles = StyleSheet.create({
  metricCounter: {   
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps({ decks }, { id }) {
  
  const deck = decks[id];
  const numberOfQuestions = deck.questions ? deck.questions.length : 0

  return {
    deck,
    numberOfQuestions,
  };
}

export default connect(mapStateToProps)(Deck)