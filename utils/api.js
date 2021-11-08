import { _getDecks } from "../_Data";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-community/async-storage'


const NOTIFICATION_KEY = 'MobileFlashCard:Notification'
const DECKS_STORAGE_KEY='DecksCard:Storage'


export function getDecks() {  
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => {
  
      if (res === null) {         
         return getInitialData().then((decks) => AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks)))
      } else {
      return JSON.parse(res);
    }
  })
}

export async function getDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => {
        const data = JSON.parse(res)[title]
    return data
  })
}



export async function saveCardToStorage(title, question) {
 const decks = await getDecks();
 const deck = await getDeck(title);
    
  let newDeck = {
    title,
    questions: [
      ...deck.questions,
      question
    ]
  }
  let mergeDecks = {
    ...decks,
    [title]: newDeck
  }
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(mergeDecks))
  return mergeDecks;
 }





export async function saveDeck({ title, deck }) {
   
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[title]:deck}));
  }



export function getInitialData() {
    return Promise.all([_getDecks()]).then(([decks])=>decks)
}



    
function createNotification() {    
    return {
        title: 'Mobile Flash Card Reminder!!!',
        body: 'Dont forget to Practice today',
         ios: {
        sound: true
            },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
        
    }
}


export function clearReminderNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}



export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tommorow = new Date();
              tommorow.setDate(tommorow.getDate() + 1);
              tommorow.setHours(20);
              tommorow.setMinutes(0);
              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tommorow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}
  
  