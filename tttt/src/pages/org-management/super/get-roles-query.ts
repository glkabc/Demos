import { useQuery } from 'react-query';
import { useClient } from 'hooks';

export interface OrgManagementRol {
  id: number;
  org_name: string;
  org_role_description: string;
}

function useSuperOrgManagement(id: number) {
  const client = useClient();
  return useQuery<OrgManagementRol[]>({
    queryKey: 'getOrgManagement',
    queryFn: async () => {
      const res = await client('getOrgManagement', {
        method: 'POST',
        data: {
          superUserId: id,
        },
      });
      if (res.code === 0) {
        return res.data.list;
      } else {
        return Promise.reject();
      }
    },
  });
}

export default useSuperOrgManagement;
