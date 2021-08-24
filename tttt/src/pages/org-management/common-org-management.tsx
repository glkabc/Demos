/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Tooltip as MdTooltip,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { MdClear, MdEdit, MdAddCircle } from 'react-icons/md';
import { BiCaretRight, BiCaretDown } from 'react-icons/bi';
import { AiFillFileText } from 'react-icons/ai';
import { ImFolderOpen } from 'react-icons/im';
import { TreeItem, TreeView } from '@material-ui/lab';
import { css, useTheme } from '@emotion/react';
import useGetTreeDataQuery, {
  TreeDataProps,
} from './common/get-tree-data-query';
import DelTreeItemDialog from './common/del-tree-dialog';
import EditorTreeItem from './common/editor-tree-dialog';

function Tooltip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <MdTooltip title={title}>
      <span css={{ display: 'inline-flex', alignItems: 'center' }}>
        {children}
      </span>
    </MdTooltip>
  );
}

function CommonOrgManagement(): React.ReactElement {
  const theme = useTheme();
  const labelIconStyle = css({
    marginRight: theme.spacing(0.5),
    width: 16,
    height: 16,
    color: '#f5a623',
  });
  const [delTreeDialog, setDelTreeDialog] = React.useState<boolean>(false);
  const [delData, setDelData] = React.useState<TreeDataProps>();
  const [editorDialog, setEditorDialog] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<TreeDataProps>();
  const [editorType, setEditorType] = React.useState<1 | 2>(1); // 1 新增 2 编辑
  const {
    data: treeData,
    isLoading: getTreeDataIsLoading,
    isSuccess: getTreeDataIsSuccess,
  } = useGetTreeDataQuery();

  // const [expandedResourceFolderIds, setExpandedResourceFolderIds] = React.useState<String[]>([])
  // const handleToggle = (_: React.ChangeEvent<Object>, nodeIds: String[]): void => {
  //   console.log(nodeIds, '数据是什么')
  //   setExpandedResourceFolderIds(nodeIds)
  // }
  // const handleClickLabel = (e: React.ChangeEvent<{}>, itemData: TreeDataProps): void => {
  //   e.preventDefault()
  //   console.log(itemData, '点击的节点数据')
  // }
  const handleClickSaveTreeData = (): void => {
    console.log('保存的数据');
  };
  /*添加子集*/
  const handelClickAddChildrenData = (
    e: React.ChangeEvent<{}>,
    data: TreeDataProps,
  ): void => {
    e.preventDefault();
    setEditorType(1);
    setEditorData(data);
    setEditorDialog(true);
  };
  /*修改数据*/
  const handleClickChangeTreeItemData = (
    e: React.ChangeEvent<{}>,
    data: TreeDataProps,
  ): void => {
    e.preventDefault();
    setEditorType(2);
    setEditorData(data);
    setEditorDialog(true);
  };
  /*删除数据*/
  const handleClickDelTreeItemData = (
    e: React.ChangeEvent<{}>,
    data: TreeDataProps,
  ) => {
    e.preventDefault();
    setDelData(data);
    setDelTreeDialog(true);
  };
  function getTreeItemLabel(node: TreeDataProps): React.ReactNode {
    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0.5, 0),

          '&:hover .action_container': {
            opacity: 1,
          },
        }}
      >
        {node.children.length === 0 ? (
          <AiFillFileText css={{ color: '#298cef' }} />
        ) : (
          <ImFolderOpen css={labelIconStyle} />
        )}
        <Typography
          variant="body2"
          css={{
            marginRight: theme.spacing(2),
            marginLeft: 3,
            fontSize: 14,
          }}
        >
          {node.label}
        </Typography>
        <div
          className="action_container"
          css={{
            display: 'flex',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 120ms linear',
            marginLeft: 5,
          }}
        >
          <Tooltip title="添加子级资源">
            <MdAddCircle
              css={{ margin: '0 4px' }}
              onClick={(e) => handelClickAddChildrenData(e, node)}
            />
          </Tooltip>
          <Tooltip title="编辑该资源">
            <MdEdit
              css={{ margin: '0 4px' }}
              onClick={(e) => handleClickChangeTreeItemData(e, node)}
            />
          </Tooltip>
          <Tooltip title="删除该资源">
            <MdClear
              css={{ margin: '0 4px' }}
              onClick={(e) => handleClickDelTreeItemData(e, node)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
  function generateTreeNode(data: TreeDataProps): JSX.Element {
    return (
      <TreeItem
        key={String(data.id)}
        nodeId={String(data.id)}
        label={getTreeItemLabel(data)}
        // onLabelClick={(event) => handleClickLabel(event, data)}
      >
        {Array.isArray(data.children)
          ? data.children.map(generateTreeNode)
          : null}
      </TreeItem>
    );
  }
  const getTreeItemFirstLabel = (node: TreeDataProps): React.ReactNode => {
    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0.5, 0),
        }}
      >
        <ImFolderOpen css={labelIconStyle} />
        <Typography
          variant="body2"
          css={{
            marginRight: theme.spacing(2),
            marginLeft: 3,
            fontSize: 14,
          }}
        >
          {node.label}
        </Typography>
      </div>
    );
  };
  const randersTreeData = (data: TreeDataProps[]): React.ReactElement => {
    return (
      <TreeView
        // disableSelection
        // expanded={expandedResourceFolderIds}
        // onNodeToggle={handleToggle}
        defaultCollapseIcon={<BiCaretDown />}
        defaultExpandIcon={<BiCaretRight />}
        css={{
          '.MuiTreeItem-content': {
            fontSize: 14,
          },
        }}
      >
        {data.map((nodes) => (
          <TreeItem
            key={String(nodes.id)}
            nodeId={String(nodes.id)}
            label={getTreeItemFirstLabel(nodes)}
          >
            {nodes.children.length > 0 &&
              nodes.children.map((v) => generateTreeNode(v))}
          </TreeItem>
        ))}
      </TreeView>
    );
  };

  return (
    <Paper
      square
      elevation={0}
      css={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        css={{
          padding: theme.spacing(2),
        }}
      >
        组织管理管理
      </Typography>
      <Divider css={{ marginBottom: theme.spacing(4) }} />
      <div
        css={{
          margin: '0 40px',
          padding: 40,
          border: '1px solid #E2E2E2',
        }}
      >
        {!getTreeDataIsLoading ? (
          getTreeDataIsSuccess ? (
            treeData && randersTreeData(treeData)
          ) : (
            <span>请求数据失败</span>
          )
        ) : (
          <div css={{ textAlign: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        )}
      </div>
      <div
        css={{
          textAlign: 'center',
          paddingTop: 60,
        }}
      >
        <Button
          css={{
            backgroundColor: '#2C90F5',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2C90F5',
            },
            marginBottom: 20,
          }}
          onClick={handleClickSaveTreeData}
        >
          保存
        </Button>
      </div>
      <DelTreeItemDialog
        open={delTreeDialog}
        handleClose={() => setDelTreeDialog(!delTreeDialog)}
        data={delData as TreeDataProps}
      />
      <EditorTreeItem
        open={editorDialog}
        handelClose={() => setEditorDialog(!editorDialog)}
        data={editorData}
        type={editorType}
      />
    </Paper>
  );
}

export default CommonOrgManagement;
