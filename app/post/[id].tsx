import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchUsers } from '../../scripts/api';

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<{ user_id: number; title: string; body: string } | null>(null);
  const [comments, setComments] = useState<{ id: number; name: string; body: string }[]>([]);
  const [users, setUsers] = useState<Record<number, { name: string; avatar: string }>>({});

  useEffect(() => {
    fetch(`https://gorest.co.in/public/v2/posts/${id}`)
      .then(response => response.json())
      .then(setPost)
      .catch(error => console.error('Error fetching post:', error));

    fetch(`https://gorest.co.in/public/v2/comments?post_id=${id}`)
      .then(response => response.json())
      .then(setComments)
      .catch(error => console.error('Error fetching comments:', error));

    fetchUsers().then(setUsers);
  }, [id]);

  if (!post) return <Text>Loading...</Text>;

  const user = users[post.user_id];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.avatar || 'https://api.dicebear.com/9.x/pixel-art/jpg' }}
          style={styles.avatar}
          resizeMode="cover"
        />

        <Text style={styles.userName}>{user?.name || 'Unknown User'}</Text>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>

      <Text style={styles.commentTitle}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Image source={{ uri: `https://api.dicebear.com/9.x/dylan/jpg?seed=${item? item.id : 10}` }}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.commentText}>{item.body}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  body: { fontSize: 16, marginBottom: 10 },
  commentTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  commentCard: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, alignItems: 'center' },
  commentText: { color: 'gray' },
});
