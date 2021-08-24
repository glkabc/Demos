/** @jsxImportSource @emotion/react */
import {
  Drawer,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Button,
  // Divider,
} from '@material-ui/core';
import RoleFormListsType from './role-formLists-type';
import RoleListFromWrapper from './role-listForm-wrapper';
interface Props {
  roleEditOpen: boolean;
  selectRows: RoleFormListsType;
  setRoleEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RoleEdit({ roleEditOpen, selectRows, setRoleEditOpen }: Props) {
  const title = selectRows.role_code ? '修改角色' : '新增角色';
  return (
    <Drawer anchor="right" open={roleEditOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        css={{
          width: `500px`,
        }}
      >
        {roleEditOpen ? (
          <RoleListFromWrapper
            setRoleEditOpen={setRoleEditOpen}
            selectRows={selectRows}
          />
        ) : null}
      </DialogContent>
      <DialogActions
        css={{
          justifyContent: 'flex-start',
        }}
      ></DialogActions>
    </Drawer>
  );
}

export default RoleEdit;
