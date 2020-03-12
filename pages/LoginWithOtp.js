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
export default class LoginwithOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Mobileno: '',
      Otp: '',
      listItems: [],
      filteredData: [],
    };
  }

  validateotp = (Mobileno, Otp) => {
    fetch('https://test-react-5b3fc.firebaseio.com/loginwithotp.json')
      .then(response => response.json())
      .then(data => this.setState({listItems: data}))

      .then(data => this.fetchSelectedData(Mobileno, Otp))
      .catch(error => {
        console.error(error);
      });
  };
  fetchSelectedData(Mobileno, Otp) {
    const result = Object.keys(this.state.listItems).map(
      key => this.state.listItems[key],
    );
    console.log(result);

    var selectedfilteredData = result
      .filter(function(item) {
        return item.Mobileno === Mobileno;
      })
      .map(function({Mobileno, Otp}) {
        return {Mobileno, Otp};
      });
    console.log(selectedfilteredData[0].Otp);
    if (selectedfilteredData[0].Otp == Otp) {
      Alert.alert('Matched');
      this.props.navigation.navigate('Dashboard');
    } else {
      Alert.alert('NotMatched');
    }
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
          onChangeText={Mobileno => this.setState({Mobileno})}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Otp"
          placeholderTextColor="#9a73ef"
          maxLength={10}
          keyboardType="numeric"
          autoCapitalize="none"
          onChangeText={Otp => this.setState({Otp})}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Validate"
            onPress={() =>
              this.validateotp(this.state.Mobileno, this.state.Otp)
            }
          />
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
