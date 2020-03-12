/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import SendSMS from 'react-native-sms';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileno: '',
    };
  }
  login = () => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    fetch('https://test-react-5b3fc.firebaseio.com/loginwithotp.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Mobileno: this.state.mobileno,
        Otp: otp,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        //Alert.alert(responseJson.name);
      })
      .catch(error => {
        console.error(error);
      });
    this.sendSmsFromLocal(this.state.mobileno, otp);

    this.props.navigation.navigate('LoginWithOtp');
  };
  sendSmsFromLocal(mobileno, otp) {
    console.log(mobileno);
    SendSMS.send(
      {
        //Message body
        body: otp,
        //Recipients Number
        recipients: [mobileno],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Mobile No"
          placeholderTextColor="#9a73ef"
          maxLength={10}
          keyboardType="numeric"
          autoCapitalize="none"
          onChangeText={mobileno => this.setState({mobileno})}
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => this.login()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  ImageStyle: {
    marginLeft: 80,
    marginTop: 30,
    height: 130,
    width: '60%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
});
