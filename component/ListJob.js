import React from "react";
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

function job({id, title, complete}){
    async function toggleComplete(){
        await firestore()
        .collection('Jobs')
        .doc(id)
        .update({
            complete: !complete,
        });
    }
    return(
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
            left={props =>(
                <List.Icon {...props} color={complete ? 'green' : 'red'} icon={complete ? 'check' : 'cancel'} />

            )}
            />
    );
}
export default job;