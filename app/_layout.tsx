import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#89cff0' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen name="index" options={{ title: 'GoHiryo - FYP' }} />
      <Stack.Screen 
        name="post/[id]" 
        options={{ title: 'Post Details' }} 
      />
    </Stack>
  );
}
