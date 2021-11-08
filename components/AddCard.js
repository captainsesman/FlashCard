import React, {Component} from 'react';
import { StyleSheet, Button , View, SafeAreaView,  TextInput} from 'react-native';
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../actions';
import {saveCardToStorage} from '../utils/api'

class AddDeck extends Component {

    state = {
        question: '',
        answer:''
    }

    onChangeQuestion = (question) => {
        this.setState({
        question,
        })
    }

    onChangeAnswer = (answer) => {
        this.setState({
        answer,
        })
    }

    submitCard = (e) => {
        e.preventDefault();
        const { route, navigation,dispatch } = this.props;
        const title = this.props.route.params.id    
        
        const card = {
            question: this.state.question,
            answer: this.state.answer,
        }

       saveCardToStorage(title, card)
        dispatch(addCard(card, title))  
         this.setState({
                question: "",
                answer: ""
                })
        navigation.goBack()
    }


    render() {
        
        const { question, answer } = this.state
        
        return (
            <View style={[styles.container]}>      
               
                 <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Question"
                        value={question}
                        onChangeText={ this.onChangeQuestion}                        
                    />
                    <TextInput
                        style={styles.input} 
                        placeholder="Enter Answer"
                         value={answer}
                        onChangeText={ this.onChangeAnswer}
                    />
                      <Button                  
                        title=" Submit"
                        color="#841584"
                        onPress={this.submitCard}
                        disabled={ question === '' || answer === ''}
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

export default connect()(AddDeck)