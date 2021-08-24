import { useQuery } from 'react-query';
import { useClient } from 'hooks';

import RoleFormType from './role-form-type';

type QueryName = 'role';
type ProductMenuQueryKey = [QueryName, number | undefined];

function getRoleQueryKey(id?: number): ProductMenuQueryKey {
  return ['role', id];
}

function useRoleQuery(id?: number) {
  const client = useClient();
  return useQuery<RoleFormType>({
    queryKey: getRoleQueryKey(id),
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as ProductMenuQueryKey;
      const res = await client('getRole', { data: { id } });
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
    enabled: id !== undefined,
    cacheTime: 0,
  });
}

export default useRoleQuery;
