import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function PostList() {
  const [posts, setPosts] = useState<
    { id: number; user_id: number; title: string; body: string }[]
  >([]);

  useEffect(() => {
    fetch('https://gorest.co.in/public/v2/posts')
      .then(response => response.json())
      .then((data) => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `./post/${item.id}`,
              params: { id: item.id.toString() }, // Pass only the post ID
            }}
            asChild
          >
            <TouchableOpacity style={styles.postItem}>
              <Text style={styles.postTitle}>{item.title}</Text>
            </TouchableOpacity>
          </Link>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  postItem: { padding: 15, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 5 },
  postTitle: { fontSize: 18 },
});
