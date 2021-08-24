import { useQuery } from 'react-query';
import { useClient } from 'hooks';
import UserFormType from './user-form-type';

type QueryName = 'user';
type ProductMenuQueryKey = [QueryName, number | undefined];
function getEditorQueryKey(id?: number): ProductMenuQueryKey {
  return ['user', id];
}
function useEditorQuery(id?: number) {
  const client = useClient();
  return useQuery<UserFormType>({
    queryKey: getEditorQueryKey(id),
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as ProductMenuQueryKey;
      const res = await client('getUser', { data: { id } });
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

export default useEditorQuery;
