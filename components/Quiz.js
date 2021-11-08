import React, {Component} from 'react';
import { StyleSheet, Button ,Text, View, SafeAreaView,  TouchableHighlight} from 'react-native';
import { white, purple } from '../utils/colors'
import { connect } from 'react-redux'

import {clearReminderNotification, setLocalNotification} from '../utils/api'


class Quiz extends Component {

  state = {
    currentQuestion: 0,
    scoreCounter: 0,
    correctAnswer: 'correct',
    isLastQuestion: false,
    flip:true,
 
  }
  handleAnswer = (status) => {
    const { questions } = this.props.deck;
    const { currentQuestion, correctAnswer, isLastQuestion, scoreCounter } = this.state
         

    if ((currentQuestion + 1) === questions.length) {
      this.setState((currentState) => ({
        scoreCounter: correctAnswer === status ? currentQuestion + 1 : currentQuestion,
       isLastQuestion: true
      }))

     

    } else {
     
      this.setState((currentState) => ({             
        scoreCounter: correctAnswer === status ? currentQuestion + 1 : currentQuestion,
        currentQuestion: currentQuestion + 1,  
      }))
    }
         
        
  }
  
  resetQuiz = () => {
  
    this.setState(() => ({
       currentQuestion: 0,
       scoreCounter: 0,
       isLastQuestion:false,
      
    }))
  }
  grader = (score, questions) => {
     return (score/questions.length)*100
  }

  flipCard = () => {
  
    const { flip } = this.state
    this.setState(() => ({
      flip: !flip
    }))
  }

  componentDidMount() {
    clearReminderNotification().then(setLocalNotification)
  }

  render() {
         
 
      const { questions} = this.props.deck
      const{id} = this.props
     
      const {currentQuestion, isLastQuestion, scoreCounter, flip}= this.state
        return (
          <View style={[styles.container]}>
            
            {questions.length !== 0 ? 
              <SafeAreaView>
                   {isLastQuestion ?
              <SafeAreaView style={[styles.card, styles.result]}>
                <View><Text style={{ color: 'blue', fontSize: 18, marginTop: 4 }}> {`Result ${this.grader(scoreCounter, questions)} %`}</Text></View>
               <View style={{  marginTop: 17 }}>             
                        <Button                  
                          title="Reset"
                      color="#00834e"
                    onPress={this.resetQuiz}
                      />

                    </View>
                    
                    <View style={{  marginTop: 17 }}>             
                     
                        <Button                  
                          title="Go Back"
                            color="#00834e"
                          onPress={() => this.props.navigation.navigate('DeckDetail', {id})}
                            />
                      </View>
                      
             </SafeAreaView>
              
              
            :
              <SafeAreaView>
                <SafeAreaView style={[styles.card, styles.questionCount]}>
                     <View><Text>{ `${currentQuestion + 1} | ${questions.length}`}</Text></View>
                  {flip ?
                    <View>
                      <Text style={{fontSize: 18, textAlign: 'center'}}>
                      {questions[currentQuestion].question}
                      </Text>
                      <TouchableHighlight onPress={this.flipCard}>
                        <View >
                          <Text style={{ color:'blue', fontSize:14, marginTop:4 }}>Show Answer</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    :
                     <View style={styles.metricCounter}>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>
                        {questions[currentQuestion].answer}
                        </Text>
                      <TouchableHighlight onPress={this.flipCard}>
                        <View >
                          <Text style={{ color:'blue', fontSize:14, marginTop:4 }}>Show Question</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    
                  }

               </SafeAreaView>
                  <SafeAreaView>
                    <View style={{  marginTop: 17 }}>             
                        <Button                  
                          title="Correct"
                      color="#00834e"
                    onPress={()=>this.handleAnswer('correct')}
                      />
                        </View>
                      <View style={{  marginTop: 17 }}>             
                        <Button                  
                          title="Incorrect"
                      color="#00834e"
                       onPress={()=>this.handleAnswer('fail')}
                              />
                      </View>
                   </SafeAreaView>
            </SafeAreaView>           
            
            }
            </SafeAreaView>
              :
              <View style={[styles.card, styles.result]}>
                <Text> You Have No Questions Entered Yet for this Card</Text>
                 <Text> Please Enter Questions to Start a Quiz</Text>
              </View>
          }
            
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
 
    center: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
    
    questionCount: {   
    justifyContent: 'center',
    alignItems: 'center',
     height:90,
  },
        
    result: {   
    justifyContent: 'center',
    alignItems: 'center',
     height:190,
  }
  
})

function mapStateToProps({ decks }, { route }) {

  const id = route.params.id; 
  return {
    deck: decks[id],
    id
  };
};


export default connect(mapStateToProps)(Quiz)