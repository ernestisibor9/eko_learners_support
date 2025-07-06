import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: '#303B79' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          This screen does not exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" style={styles.linkText}>
            Go to home screen
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
