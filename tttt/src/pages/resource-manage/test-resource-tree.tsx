/** @jsxImportSource @emotion/react */
import { Typography, Tooltip as MdTooltip } from '@material-ui/core';
import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile,
  MdArrowDownward,
  MdArrowUpward,
  MdClear,
  MdEdit,
  MdAddCircle,
} from 'react-icons/md';
import { TreeItem, TreeView } from '@material-ui/lab';
import { css, useTheme } from '@emotion/react';

import useResourcesQuery, { Resource } from './use-resources-query';

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
}

function ResourceTree({
  selectedResourceId,
  setSelectedResourceId,
  expandedResourceFolderIds,
  setExpandedResourceFolderIds,
}: Props) {
  const theme = useTheme();

  const labelIconStyle = css({
    marginRight: theme.spacing(0.5),
    width: 16,
    height: 16,
  });

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    setSelectedResourceId(Number.parseInt(nodeIds, 10));
  };

  const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setExpandedResourceFolderIds(nodeIds);
  };

  const { data, isIdle, isLoading, isError, isSuccess } = useResourcesQuery();

  function getTreeItemLabel(
    node: Resource,
    expanded: boolean,
    isFirst: boolean,
    isLast: boolean,
  ) {
    const moveUpIcon = isFirst ? null : (
      <Tooltip title="上移">
        <MdArrowUpward />
      </Tooltip>
    );
    const moveDownIcon = isLast ? null : (
      <Tooltip title="下移">
        <MdArrowDownward />
      </Tooltip>
    );
    const folderIcon = expanded ? (
      <MdFolderOpen css={labelIconStyle} />
    ) : (
      <MdFolder css={labelIconStyle} />
    );
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
        {node.resource_type === 'menu' ? (
          folderIcon
        ) : (
          <MdInsertDriveFile css={labelIconStyle} />
        )}
        <Typography
          variant="body2"
          css={{
            marginRight: theme.spacing(1),
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
          }}
        >
          {node.resource_type === 'menu' ? (
            <Tooltip title="添加子级资源">
              <MdAddCircle css={labelIconStyle} />
            </Tooltip>
          ) : null}
          <Tooltip title="编辑该资源">
            <MdEdit css={labelIconStyle} />
          </Tooltip>
          <Tooltip title="删除该资源">
            <MdClear css={labelIconStyle} />
          </Tooltip>
          {moveUpIcon}
          {moveDownIcon}
        </div>
      </div>
    );
  }

  function generateTreeNode(
    data: Resource,
    index: number,
    array: Resource[],
  ): JSX.Element {
    return (
      <TreeItem
        key={String(data.resource_id)}
        nodeId={String(data.resource_id)}
        label={getTreeItemLabel(
          data,
          Boolean(
            expandedResourceFolderIds.find(
              (id) => id === String(data.resource_id),
            ),
          ),
          index === 0,
          index === array.length - 1,
        )}
        onLabelClick={(event) => {
          event.preventDefault();
          setSelectedResourceId(data.resource_id);
        }}
      >
        {Array.isArray(data.resource_children)
          ? data.resource_children.map(generateTreeNode)
          : null}
      </TreeItem>
    );
  }

  if (isIdle || isLoading) {
    return <div>加载中...</div>;
  }
  if (isError) {
    return <div>加载错误</div>;
  }

  if (isSuccess && data) {
    return (
      <TreeView
        disableSelection
        expanded={expandedResourceFolderIds}
        onNodeToggle={handleToggle}
        defaultCollapseIcon={<MdArrowDropUp />}
        defaultExpandIcon={<MdArrowDropDown />}
      >
        {data.map(generateTreeNode)}
      </TreeView>
    );
  }

  return null;
}

export default ResourceTree;
