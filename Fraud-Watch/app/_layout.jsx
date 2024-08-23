import { StyleSheet, Text, View } from 'react-native';
import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown:false }} />
            {/* Ensure other Stack.Screen entries are here if needed */}
        </Stack>
    )
}

export default RootLayout;

const styles = StyleSheet.create({
    // Add any global styles you might need for the layout
});
