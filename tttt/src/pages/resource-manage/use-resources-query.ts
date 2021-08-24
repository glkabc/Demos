import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface Resource {
  resource_id: number;
  resource_name: string;
  resource_type: 'node' | 'menu';
  resource_code: string;
  resource_active: boolean;
  resource_path: string;
  resource_remark: string;
  resource_children: Resource[];
}

function useResourcesQuery() {
  const client = useClient();
  return useQuery<Resource[]>({
    queryKey: 'resources',
    queryFn: async () => {
      const res = await client('getResources');
      if (res.code === 0) {
        return res.data;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useResourcesQuery;
