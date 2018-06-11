import React from 'react';
import { StyleSheet,TextInput, Text, Button, View, Keyboard } from 'react-native';
// import { Container, Header, Item, Input, Icon, Button, Text, Content } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {

  state = {
    toTranslate: '',
    translation: '',
    translationFound: false
  }


  translate = () => {

    Keyboard.dismiss()
    const string = this.state.toTranslate.toLowerCase();

    return fetch('http://api.funtranslations.com/translate/minion.json?text='+string)
      .then((response) => response.json())
      .then((responseJson) => {

        var data = responseJson.contents.translated ? responseJson.contents.translated : false
        console.log(data)
        
        if (data) {
                  this.setState({
                    translation: data,
                    translationFound: true
                  })
                }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  // translate = () => {

  //   Keyboard.dismiss()
  //   const string = this.state.toTranslate.toLowerCase();

  //   const query = 'http://api.funtranslations.com/translate/minion.json?text='+string

  //   axios.get(query)
  //     .then((response) => {

  //       var data = response.data.contents.translated ? response.data.contents.translated : false
        
  //       console.log('whole content' + response)
  //       console.log('just translation'+ data)
        

  //       if (data) {
  //         this.setState({
  //           translation: data,
  //           translationFound: true
  //         })
  //         console.log(this.state.translation)
  //       }
  //     }).catch((_error) => {
  //         this.setState({
  //           translationFound: false
  //         });
  //       }) 
  //       console.log("second state" + this.state.translation)
  // }

  renderContent = () => {
    console.log("i am rendering!")
    if(this.state.translation) {
      return <View><Text>{this.state.translation}</Text></View>
    }
    else {
      return (
      <View>
        <Text>No translation found</Text>
      </View>
      )}
  }

  render() {
    return (
      <View>
        <TextInput
        style={{marginTop: 150, height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(toTranslate) => this.setState({toTranslate})}
        value={this.state.toTranslate}
      />
      <Button
        title="Translate"
        onPress={this.translate}/>
      <View>
        {this.renderContent()}
      </View>
      </View>

        // <Container>
        //   <Header searchBar rounded>
        //     <Item>
        //       <Icon name="ios-search" />
        //       <Input
        //         value={this.state.toTranslate}
        //         placeholder="text to translate"
        //         onChangeText={(toTranslate) => this.setState({toTranslate})}
        //         returnKeyType="go"
        //         onSubmitEditing={this.translate}/>
        //       <Icon name="chatboxes" />
        //     </Item>
        //     <Button transparent>
        //       <Text>Translate</Text>
        //     </Button>
        //   </Header>
        //   <View>
        //     {this.renderContent()}
        //   </View>
        // </Container>
    );
  }
}

