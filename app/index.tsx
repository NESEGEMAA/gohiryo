import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { fetchUsers } from '../scripts/api';

export default function PostList() {
  const [posts, setPosts] = useState<{ id: number; user_id: number; title: string; body: string }[]>([]);
  const [users, setUsers] = useState<Record<number, { name: string; avatar: string }>>({});

  useEffect(() => {
    fetch('https://gorest.co.in/public/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    fetchUsers().then(setUsers);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3e4a0' }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const user = users[item.user_id];
          return (
            <Link href={`/post/${item.id}`} asChild>
              <TouchableOpacity style={styles.postItem}>
                <Image
                  source={{ uri: user?.avatar || 'https://api.dicebear.com/9.x/pixel-art/jpg' }}
                  style={styles.avatar}
                  resizeMode="cover"
                />

                <View>
                  <Text style={styles.userName}>{user?.name || 'Unknown User'}</Text>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <Text style={styles.postContent}>{item.body}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontWeight: 'bold' },
  postTitle: { color: 'gray' },
  postContent: { color: 'gray', fontSize: 12 }
});

