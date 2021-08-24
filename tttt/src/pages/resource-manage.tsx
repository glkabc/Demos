/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Paper, Typography, Divider, Grid } from '@material-ui/core';
import { useTheme } from '@emotion/react';

import ResourceTree from './resource-manage/resource-tree';
import ResourceFrom from './resource-manage/resource-from';
import { ISubmitData } from './resource-manage/resource-form-type';
import { Resource } from './resource-manage/use-resources-query';

function ResourceManage() {
  const theme = useTheme();
  const [selectedResourceId, setSelectedResourceId] = React.useState<number>();
  const [expandedResourceFolderIds, setExpandedResourceFolderIds] =
    React.useState<string[]>([]);
  const [editorData, setEditorData] = React.useState<ISubmitData>();
  const [editorType, setEditorType] = React.useState<0 | 1>(0); // 0 编辑 1 新增子集
  const handleSubmitData = (data: ISubmitData, type: 0 | 1 | 2): void => {
    // 0 更新数据  1 新增子集数据  2 新增一级数据
    console.log(data, type, '保存的数据');
  };
  const handleEditorResourceItem = (data: Resource, type: 0 | 1) => {
    console.log(data, '需要编辑的数据');
    setEditorType(type);
    setEditorData({
      resource_name: data.resource_name,
      resource_classify: '分类1',
      resource_code: data.resource_code,
      resource_statue: 0,
      resource_address: data.resource_name,
      resource_remark: data.resource_remark,
    });
  };
  return (
    <Paper
      square
      elevation={0}
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        css={{
          padding: theme.spacing(2),
        }}
      >
        资源管理
      </Typography>
      <Divider css={{ marginBottom: theme.spacing(4) }} />
      <div
        css={{
          flexGrow: 1,
          padding: theme.spacing(0, 1),
          minHeight: document.documentElement.clientHeight - 250,
          position: 'relative',
          marginBottom: 40,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} xl={4}>
            <div
              css={{
                margin: '0 20px',
                border: '1px solid #E5E5E5',
              }}
            >
              <p
                css={{
                  lineHeight: '50px',
                  textAlign: 'center',
                  backgroundColor: '#e9f6fb',
                  color: '#333333',
                  fontSize: 16,
                }}
              >
                全部菜单
              </p>
              <div
                css={{
                  minHeight: document.documentElement.clientHeight - 582,
                  maxHeight: document.documentElement.clientHeight - 350,
                  padding: 20,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '0px',
                  },
                }}
              >
                <ResourceTree
                  selectedResourceId={selectedResourceId}
                  setSelectedResourceId={setSelectedResourceId}
                  expandedResourceFolderIds={expandedResourceFolderIds}
                  setExpandedResourceFolderIds={setExpandedResourceFolderIds}
                  handleEditorResourceItem={handleEditorResourceItem}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={8} xl={8}>
            <div
              css={{
                border: '1px solid #E5E5E5',
                padding: 20,
                marginRight: 20,
              }}
            >
              <span
                css={{
                  fontSize: 18,
                  color: '#0080CC',
                  display: 'block',
                  marginTop: -32,
                  width: 83,
                  padding: '0 5px',
                  backgroundColor: '#fff',
                }}
              >
                菜单配置
              </span>
              <ResourceFrom
                handleSubmitData={handleSubmitData}
                editorData={editorData as ISubmitData}
                editorType={editorType}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default ResourceManage;
