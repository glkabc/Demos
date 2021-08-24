import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface RoleRow {
  id: number;
  user_name: string;
  user_id: number;
  user_mail: string;
  user_phone: string;
  user_structuer: string;
  user_type: string;
  user_status: number;
}

function useUsersQuery() {
  const client = useClient();
  return useQuery<RoleRow[]>({
    queryKey: 'users',
    queryFn: async () => {
      const res = await client('getUsers');
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useUsersQuery;
