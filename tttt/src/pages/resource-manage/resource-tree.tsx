/** @jsxImportSource @emotion/react */
import {
  Typography,
  Tooltip as MdTooltip,
  CircularProgress,
} from '@material-ui/core';
import { MdClear, MdEdit, MdAddCircle } from 'react-icons/md';
import { TreeItem, TreeView } from '@material-ui/lab';
import { BiCaretRight, BiCaretDown } from 'react-icons/bi';
import { css, useTheme } from '@emotion/react';
import { ImFolderOpen } from 'react-icons/im';
import { AiFillFileText } from 'react-icons/ai';
import DelResourceTreeItem from './del-resource-tree-item';

import useResourcesQuery, { Resource } from './use-resources-query';
import React, { ReactElement } from 'react';

// TODO react-icons 没有forward ref 到svg元素上，以至像Tooltip这种要求ref的组件无法使用，临时使用span包裹
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

interface Props {
  selectedResourceId?: number;
  setSelectedResourceId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  expandedResourceFolderIds: string[];
  setExpandedResourceFolderIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleEditorResourceItem: (data: Resource, type: 1 | 0) => void;
}

function ResourceTree({
  selectedResourceId,
  setSelectedResourceId,
  expandedResourceFolderIds,
  setExpandedResourceFolderIds,
  handleEditorResourceItem,
}: Props) {
  const theme = useTheme();

  const labelIconStyle = css({
    marginRight: theme.spacing(0.5),
    width: 16,
    height: 16,
    color: '#f5a623',
  });
  const [delDialog, setDelDialog] = React.useState(false);

  const { data, isIdle, isLoading, isError, isSuccess } = useResourcesQuery();

  function getTreeItemLabel(node: Resource): React.ReactNode {
    const handleClickDelTreeItemData = (
      e: React.MouseEvent<SVGElement, MouseEvent>,
      nodes: Resource,
    ): void => {
      e.preventDefault();
      console.log(nodes, '要删除的数据');
      setDelDialog(true);
    };
    const handleClickChangeTreeItemData = (
      e: React.MouseEvent<SVGElement, MouseEvent>,
      nodes: Resource,
    ): void => {
      e.preventDefault();
      handleEditorResourceItem(nodes, 0);
    };
    const handelClickAddChildrenData = (
      e: React.MouseEvent<SVGElement, MouseEvent>,
      nodes: Resource,
    ): void => {
      e.preventDefault();
      handleEditorResourceItem(nodes, 1);
    };
    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: 4,

          '&:hover .action_container': {
            opacity: 1,
          },
        }}
      >
        {!node.resource_children || node.resource_children?.length === 0 ? (
          <AiFillFileText css={{ color: '#298cef' }} />
        ) : (
          <ImFolderOpen css={labelIconStyle} />
        )}
        <Typography
          variant="body2"
          css={{
            marginRight: 16,
            marginLeft: 3,
            fontSize: 14,
          }}
        >
          {node.resource_name}
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
          {node?.resource_children?.length > 0 ? (
            <Tooltip title="添加子级资源">
              <MdAddCircle
                css={{ margin: '0 4px' }}
                onClick={(e) => handelClickAddChildrenData(e, node)}
              />
            </Tooltip>
          ) : null}
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

  function generateTreeNode(data: Resource): JSX.Element {
    return (
      <TreeItem
        key={String(data.resource_id)}
        nodeId={String(data.resource_id)}
        label={getTreeItemLabel(data)}
      >
        {Array.isArray(data.resource_children)
          ? data.resource_children.map(generateTreeNode)
          : null}
      </TreeItem>
    );
  }

  const randersTreeData = (data: Resource[]): ReactElement => {
    return (
      <TreeView
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
            key={String(nodes.resource_id)}
            nodeId={String(nodes.resource_id)}
            label={getTreeItemLabel(nodes)}
          >
            {nodes?.resource_children.length > 0 &&
              nodes.resource_children.map((v) => generateTreeNode(v))}
          </TreeItem>
        ))}
      </TreeView>
    );
  };
  if (isIdle || isLoading) {
    return (
      <div
        css={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </div>
    );
  }
  if (isError) {
    return <div>加载错误</div>;
  }

  if (isSuccess && data) {
    return (
      <>
        {randersTreeData(data)}
        <DelResourceTreeItem open={delDialog} setDelDialog={setDelDialog} />
      </>
    );
  }

  return null;
}

export default ResourceTree;
