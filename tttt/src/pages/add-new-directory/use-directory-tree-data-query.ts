import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface IDirectoryData {
  id: number;
  label: string;
  children: IDirectoryData[];
}

function useDirectoryTreeDataQuery() {
  const client = useClient();
  return useQuery<IDirectoryData[]>({
    queryKey: 'getDirectoryTreeData',
    queryFn: async () => {
      const res = await client('getDirectoryTree', {
        method: 'GET',
      });
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useDirectoryTreeDataQuery;
