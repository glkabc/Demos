/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { TreeItem, TreeView } from '@material-ui/lab';
import { BiCaretRight, BiCaretDown } from 'react-icons/bi';
import { ImFolderOpen } from 'react-icons/im';
import {
  Typography,
  Tooltip as MdTooltip,
  CircularProgress,
} from '@material-ui/core';
import { css } from '@emotion/react';
import { MdClear, MdEdit, MdAddCircle } from 'react-icons/md';
import { AiFillFileText } from 'react-icons/ai';
import useDirectoryTreeDataQuery, {
  IDirectoryData,
} from './use-directory-tree-data-query';
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
const labelIconStyle = css({
  marginRight: 4,
  width: 16,
  height: 16,
  color: '#f5a623',
});
function getTreeItemLabel(node: IDirectoryData): React.ReactNode {
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
      {node.children.length === 0 ? (
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
        {node.children.length > 0 ? (
          <Tooltip title="添加子级资源">
            <MdAddCircle
              css={{ margin: '0 4px' }}
              onClick={(e) =>
                /*handelClickAddChildrenData(e, node)*/ e.preventDefault()
              }
            />
          </Tooltip>
        ) : null}
        <Tooltip title="编辑该资源">
          <MdEdit
            css={{ margin: '0 4px' }}
            onClick={(e) =>
              /*handleClickChangeTreeItemData(e, node)*/ e.preventDefault()
            }
          />
        </Tooltip>
        <Tooltip title="删除该资源">
          <MdClear
            css={{ margin: '0 4px' }}
            onClick={(e) =>
              /*handleClickDelTreeItemData(e, node)*/ e.preventDefault()
            }
          />
        </Tooltip>
      </div>
    </div>
  );
}
function generateTreeNode(data: IDirectoryData): JSX.Element {
  return (
    <TreeItem
      key={String(data.id)}
      nodeId={String(data.id)}
      label={getTreeItemLabel(data)}
    >
      {Array.isArray(data.children)
        ? data.children.map(generateTreeNode)
        : null}
    </TreeItem>
  );
}
// const getTreeItemFirstLabel = (node: IDirectoryData): React.ReactNode => {
//   return (
//     <div
//       css={{
//         display: 'flex',
//         alignItems: 'center',
//         padding: 4,
//       }}
//     >
//       <ImFolderOpen css={labelIconStyle} />
//       <Typography
//         variant="body2"
//         css={{
//           marginRight: 4,
//           marginLeft: 3,
//           fontSize: 14,
//         }}
//       >
//         {node.label}
//       </Typography>
//     </div>
//   );
// };
const randersTreeData = (
  data: IDirectoryData[],
  type: 0 | 1 | 2,
): ReactElement => {
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
          key={String(nodes.id)}
          nodeId={String(nodes.id)}
          label={getTreeItemLabel(nodes)}
        >
          {nodes.children.length > 0 &&
            nodes.children.map((v) => generateTreeNode(v))}
        </TreeItem>
      ))}
    </TreeView>
  );
};
function NewDirectoryTree({ type }: { type: 0 | 1 | 2 }) {
  const { data, isLoading, isError } = useDirectoryTreeDataQuery();
  return (
    <div
      css={{
        margin: '20px 0',
        padding: 20,
        border: '1px solid #eee',
      }}
    >
      {isLoading ? (
        <div css={{ textAlign: 'center' }}>
          <CircularProgress color="primary" />
        </div>
      ) : isError ? (
        <p>请求出现错误。</p>
      ) : (
        data && randersTreeData(data, type)
      )}
    </div>
  );
}

export default NewDirectoryTree;
