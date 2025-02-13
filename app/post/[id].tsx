import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Get ID from params
  const [post, setPost] = useState<null | { 
    id: number; 
    user_id: number; 
    title: string; 
    body: string; 
  }>(null);

  const [comments, setComments] = useState<{ 
    id: number; 
    post_id: number; 
    name: string; 
    email: string; 
    body: string; 
  }[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`https://gorest.co.in/public/v2/posts/${id}`)
        .then(response => response.json())
        .then((data) => setPost(data))
        .catch(error => console.error('Error fetching post:', error));

      fetch(`https://gorest.co.in/public/v2/posts/${id}/comments`)
        .then(response => response.json())
        .then((data) => setComments(data))
        .catch(error => console.error('Error fetching comments:', error));
    }
  }, [id]);

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>

          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentBody}>{item.body}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  body: { fontSize: 16, marginBottom: 20 },
  commentsTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  comment: { padding: 10, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 5 },
  commentName: { fontSize: 16, fontWeight: 'bold' },
  commentBody: { fontSize: 14 },
});
