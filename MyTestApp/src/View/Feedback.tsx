import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import api from "../api/index.js";

const Feedback = ({ navigation }: { navigation: any }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const submitFeedback = async () => {
        if (comment === '' || rating === 0) {
            setErrorMessage("Please leave a comment and select a rating before submitting.");
        } else {
            setErrorMessage("");
            await api.post(`/feedback/submit`, {
                comment: comment,
                rating: rating,
            })
                .then(function (response) {
                    console.log(response.data);
                    navigation.navigate('ThankYouPage'); // Navigate to a thank you page after submission
                })
                .catch(function (error) {
                    setErrorMessage(error.response.data.msg)
                });
        }
    }
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Text style={i <= rating ? styles.filledStar : styles.emptyStar}>★</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Feedback</Text>
            <Text style={styles.headerText}>We value your feedback.</Text>
            <Text style={styles.headerText}>Please let us know how we're doing!</Text>
            <View style={styles.form}>
                <TextInput
                        style={styles.input}
                        onChangeText={setComment}
                        value={comment}
                        placeholder="Your comments"
                        placeholderTextColor="gray"
                    />
                    <View style={styles.starRating}>
                        {renderStars()}
                    </View>
                    <Text style={errorMessage !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
                        <Text style={styles.submitButtonText}>Submit Feedback</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center',
        paddingTop: 94, // Adjust this value as needed to make room for the header
    },
    backButton: {
        position: 'absolute',
        top: 58, // Adjust this value as needed to position the back button correctly
        left: 18, // Adjust this value as needed for the side padding
        zIndex: 10, // Ensure the back button is above other elements
    },
    backButtonText: {
        color: '#000000',
    },
    pageHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 58,
        height: 36
    },
    headerLabelsLeft: {
        direction:'ltr', 
        color: '#000000' 
    },
    title: {
        color: "#9a1924",
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerText: {
        color: "black",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    form: {
        flex: 2,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fcf0e8',
        color: "black"
    },
    focusedInput: {
        borderColor: '#9a1924', // Change border color when input is focused
    },
    starRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    filledStar: {
        color: '#ffd700', // Gold color for filled stars
        fontSize: 30,
        marginHorizontal: 5,
    },
    emptyStar: {
        color: '#cccccc', // Light grey color for empty stars
        fontSize: 30,
        marginHorizontal: 5,
    },
    submitButton: {
        marginTop: "5%",
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        opacity: 0.75,
        fontWeight: "bold",
        display: "flex",
        textAlign: "center",
        marginBottom: 10
    },
    errorMessageDisable: {
        display: "none"
    },
    link: {
        marginTop: "5%"
    },
    linkText: {
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "italic",
        textDecorationLine: 'underline',
    }
});

export default Feedback;