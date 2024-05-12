import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Register = ({ navigation }) => {
    const [values, setValues] = useState({fullname: '', email: '', password: '' ,confirmPassword: ''});
    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const updateInputval = (val, key) => {
        const value = { ...values };
        value[key] = val;
        setValues({ ...value });
    };

    const registerSubmit = () => {
        console.log(values);
        if (!values.fullname || !values.email || !values.password || !values.confirmPassword) {
            Alert.alert("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (values.password !== values.confirmPassword) {
            Alert.alert("Mật khẩu không trùng khớp");
            return;
        }
        if (values.password.length < 6) {
            Alert.alert("Mật khẩu phải dài hơn 6 kí tự");
            return;
        }
        auth().createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
            return firestore().collection('users').doc(userCredential.user.uid).set({
                fullname: values.fullname,
                password: values.password,
                email: values.email
            });
        })
        .then(() => {
        
            setValues({fullname: '', email: '', password: '', confirmPassword: '' });
            Alert.alert("Đăng ký thành công")
            navigation.navigate('Login');
        })
        .catch((error) => {
            Alert.alert(error.message);
        });
    };

    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image resizeMode='contain' source={require('../../assets/firebase.png')} style={{ width: '50%', height: focused ? 0 : 200 }} />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <TextInput placeholder='Full Name' onChangeText={(text) => updateInputval(text,'fullname')} style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10}} />
                            <TextInput placeholder='Email' value={values.email} onChangeText={(text) => updateInputval(text, 'email')} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 }} />
    
                            <TextInput placeholder='Password' value={values.password} onChangeText={(text) => updateInputval(text, 'password')} secureTextEntry={!passwordVisible} style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 }}
                            />
                          
                            <TextInput placeholder='Confirm Password' value={values.confirmPassword} onChangeText={(text) => updateInputval(text, 'confirmPassword')} secureTextEntry={!passwordVisible} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={registerSubmit}>
                        <Text style={{ padding: 10, textAlign: 'center', color: 'white', backgroundColor: '#f6880e', borderRadius: 10 }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                        <Text style={{ textAlign: 'center', color: '#000', borderRadius: 10, marginTop: 10 }}>Already have an account? Login!</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

export default Register;
