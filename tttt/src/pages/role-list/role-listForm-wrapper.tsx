/** @jsxImportSource @emotion/react */
import RoleFormListsType from './role-formLists-type';
import RoleListForm from './roleList-form';
interface Props {
  setRoleEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectRows: RoleFormListsType;
}
export const RoleListFormDefaultValue: RoleFormListsType = {
  role_name: '',
  role_code: undefined,
  role_comments: '',
};

function RoleListFromWrapper({ setRoleEditOpen, selectRows }: Props) {
  if (selectRows.role_code) {
    return (
      <RoleListForm
        defaltValues={selectRows}
        setRoleEditOpen={setRoleEditOpen}
      />
    );
  } else {
    return (
      <RoleListForm
        defaltValues={RoleListFormDefaultValue}
        setRoleEditOpen={setRoleEditOpen}
      />
    );
  }
}

export default RoleListFromWrapper;
