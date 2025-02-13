export const fetchUsers = async (): Promise<Record<number, { name: string; avatar: string }>> => {
  try {
    const response = await fetch('https://gorest.co.in/public/v2/users');
    const data: { id: number; name: string }[] = await response.json();

    const userMap = data.reduce<Record<number, { name: string; avatar: string }>>(
      (acc, user) => {
        acc[user.id] = {
          name: user.name,
          avatar: `https://api.dicebear.com/9.x/dylan/svg?seed=${user? user.id : 10}`,
        };
        return acc;
      },
      {}
    );

    return userMap;
  } catch (error) {
    console.error('Error fetching users:', error);
    return {};
  }
};
