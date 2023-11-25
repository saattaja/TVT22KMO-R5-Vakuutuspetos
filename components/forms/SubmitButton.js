import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

//lähettää formin
function SubmitButton({title, color = "#c54840"}) {

  const { handleSubmit } = useFormikContext();

    return (
        <TouchableOpacity 
        style={[styles.button, { backgroundColor: color}]}
        onPress={handleSubmit}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#c54840',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10
    },
    text: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default SubmitButton;

