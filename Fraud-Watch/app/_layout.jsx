import { StyleSheet, View } from 'react-native';
import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <View style={styles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent', // Set to transparent or any default color you prefer
    },
});

export default RootLayout;
