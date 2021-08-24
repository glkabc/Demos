import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface TreeDataProps {
  id: String;
  label: String;
  children: TreeDataProps[];
}

function useGetTreeDataQuery() {
  const client = useClient();
  return useQuery<TreeDataProps[]>({
    queryKey: 'TreeDataKey',
    queryFn: async () => {
      const res = await client('/getTreeData', {
        method: 'POST',
        data: {},
      });
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useGetTreeDataQuery;
