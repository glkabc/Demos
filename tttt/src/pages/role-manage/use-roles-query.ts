import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface RoleRow {
  id: number;
  role_name: string;
  resource_number: string;
  resource_name: string;
  role_description: string;
  role_status: boolean;
}

function useRolesQuery() {
  const client = useClient();
  return useQuery<RoleRow[]>({
    queryKey: 'roles',
    queryFn: async () => {
      const res = await client('getRoles');
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useRolesQuery;
