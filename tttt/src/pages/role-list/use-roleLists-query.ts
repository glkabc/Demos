import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface RoleRow {
  id: number;
  role_name: string;
  role_code: string;
  role_comments: string;
}

function useRoleListsQuery() {
  const client = useClient();
  return useQuery<RoleRow[]>({
    queryKey: 'roleList',
    queryFn: async () => {
      const res = await client('getRoleLists');
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useRoleListsQuery;
