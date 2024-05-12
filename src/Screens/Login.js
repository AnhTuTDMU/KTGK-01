import React, {useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {KeyboardAvoidingView, Platform} from 'react-native';

const Login = ({navigation}) => {
  const [values, setValues] = useState({email: '', password: ''});
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const updateInputval = (val, key) => {
    const value = {...values};
    value[key] = val;
    setValues({...value});
  };

  const loginSubmit = () => {
    console.log(values);
    if (!values.email || !values.password) {
      Alert.alert('Email hoặc mật khẩu không chính xác');
      return;
    }
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setValues({email: '', password: ''});
        Alert.alert('Đăng nhập thành công');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <View style={{alignItems: 'center', margin: 20}}>
          <Image
            resizeMode="contain"
            source={require('../../assets/firebase.png')}
            style={{width: '100%', height: focused ? 0 : 200}}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={text => updateInputval(text, 'email')}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={text => updateInputval(text, 'password')}
                secureTextEntry={!passwordVisible}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{margin: 10}}>
                  {passwordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={loginSubmit}>
            <Text
              style={{
                padding: 15,
                textAlign: 'center',
                color: 'white',
                backgroundColor: '#f6880e',
                borderRadius: 10,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                padding: 15,
                textAlign: 'center',
                color: '#000',
                borderRadius: 10,
                marginTop: 10,
              }}>
              Create new account!
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
