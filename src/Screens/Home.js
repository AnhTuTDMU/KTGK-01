import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Job from '../../component/ListJob';

function Home({ navigation }) {
    const [jobs, setJobs] = useState([]); // Danh sách công việc
    const [newJob, setNewJob] = useState(''); // Công việc mới

    useEffect(() => {
        const unsubscribe = firestore().collection('Jobs')
            .onSnapshot(snapshot => {
                const updatedJobs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setJobs(updatedJobs);
            });
        
        return () => unsubscribe();
    }, []);  // sử dụng lấy danh sách công việc
    const handleAddJob = async () => {
        if (newJob.trim() === '') {
            return;
        }

        try {
            await firestore().collection('Jobs').add({
                title: newJob,
                complete: false,
            });
            setNewJob('');
        } catch (error) {
            console.error("Error ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Login'); // Chuyển đến màn hình đăng nhập sau khi logout
        } catch (error) {
            console.error("Đăng xuất thành công ", error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar>
                <Appbar.Content title="Jobs List" />
                <Appbar.Action icon="logout" color="red" onPress={handleLogout} />
            </Appbar>
            <FlatList
                style={{ flex: 1 }}
                data={jobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Job {...item} />}
            />
            <TextInput
                label="New Job"
                value={newJob}
                onChangeText={(text) => setNewJob(text)}
            />
            <Button onPress={handleAddJob}>Add Job</Button>
        </View>
    );
}

export default Home;
