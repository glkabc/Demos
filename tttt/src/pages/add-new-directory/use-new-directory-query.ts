import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface IDirectoryProps {
  id: number;
  name: string;
  type: string;
  can_use: boolean;
}

function useGetNewDirectoryListQuery() {
  const client = useClient();
  return useQuery<IDirectoryProps[]>({
    queryKey: 'getDirectoryList',
    queryFn: async () => {
      const res = await client('getDirectoryList', {
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

export default useGetNewDirectoryListQuery;
