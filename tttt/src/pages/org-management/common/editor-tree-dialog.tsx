/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Drawer,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { TreeDataProps } from './get-tree-data-query';
import { useTheme } from '@emotion/react';

interface Props {
  open: boolean;
  handelClose: () => void;
  data: TreeDataProps | undefined;
  type: 1 | 2; // 1 新增 2 编辑
}

function EditorTreeItem({
  open,
  handelClose,
  data,
  type,
}: Props): React.ReactElement {
  const theme = useTheme();
  const [orgName, setOrgName] = React.useState<String>('');
  const [orgNameFa, setOrgNameFa] = React.useState<String>('');
  const [orgDesc, setOrgDesc] = React.useState<String>('');
  React.useEffect(() => {
    if (data !== undefined) {
      setOrgNameFa(data.label);
      setOrgName('');
    }
    if (type === 2 && data !== undefined) {
      setOrgName(data!.label);
    }
  }, [data, type]);
  const handelClickSubmit = () => {
    let submitData = {
      orgName,
      orgDesc,
    };
    console.log(submitData, '提交修改的数据');
  };
  return (
    <Drawer anchor="right" open={open} onClose={handelClose}>
      <DialogTitle id="alert-dialog-title">
        {type === 1 ? '新增组织' : '编辑组织管理'}
      </DialogTitle>
      <Divider />
      <DialogContent
        css={{
          width: `calc(45vw - ${theme.dashboardDrawerWidth}px)`,
        }}
      >
        {type === 1 ? (
          <TextField
            label={'上级组织名称'}
            disabled={true}
            value={orgNameFa}
            onChange={(e) => setOrgNameFa(e.target.value)}
            css={{
              width: '100%',
              marginTop: 20,
            }}
          />
        ) : null}
        <br />
        <br />
        <TextField
          label={'组织名称'}
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          css={{
            width: '100%',
          }}
        />
        <br />
        <br />
        <TextField
          label={'组织介绍'}
          value={orgDesc}
          onChange={(e) => setOrgDesc(e.target.value)}
          css={{
            width: '100%',
          }}
          multiline
          rowsMax={6}
        />
      </DialogContent>
      <Divider />
      <DialogActions
        css={{
          justifyContent: 'flex-start',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={handelClickSubmit}
        >
          确认
        </Button>
        <Button onClick={handelClose}>取消</Button>
      </DialogActions>
    </Drawer>
  );
}

export default React.memo(EditorTreeItem);
