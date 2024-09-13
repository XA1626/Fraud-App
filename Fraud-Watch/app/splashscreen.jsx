import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LoginPage');
        }, 2000); // Adjust the timing as needed
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/fraudwatchlogo.png')}
                style={styles.logo}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
    },
});
export default SplashScreen;
