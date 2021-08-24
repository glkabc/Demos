import { GridLocaleText } from '@material-ui/data-grid';

const LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'No rows',
  noResultsOverlayLabel: 'No results found.',
  errorOverlayDefaultLabel: 'An error occurred.',

  // Density selector toolbar button text
  toolbarDensity: '显示风格',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: '紧凑',
  toolbarDensityStandard: '标准',
  toolbarDensityComfortable: '舒适',

  // Columns selector toolbar button text
  toolbarColumns: '字段',
  toolbarColumnsLabel: 'Select columns',

  // Filters toolbar button text
  toolbarFilters: '过滤器',
  toolbarFiltersLabel: 'Show filters',
  toolbarFiltersTooltipHide: '隐藏过滤器',
  toolbarFiltersTooltipShow: '显示过滤器',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,

  // Export selector toolbar button text
  toolbarExport: '导出',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: '导出CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: '查找字段',
  columnsPanelTextFieldPlaceholder: '字段名称',
  columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: '显示所有字段',
  columnsPanelHideAllButton: '隐藏所有字段',

  // Filter panel text
  filterPanelAddFilter: 'Add filter',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelOperators: '过滤条件',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: '字段',
  filterPanelInputLabel: '值',
  filterPanelInputPlaceholder: '字段值',

  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorEquals: '相等',
  filterOperatorStartsWith: '起始于',
  filterOperatorEndsWith: '结束于',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',

  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: '选择显示字段',
  columnMenuFilter: '添加过滤条件',
  columnMenuHideColumn: '隐藏该字段',
  columnMenuUnsort: '无序',
  columnMenuSortAsc: '升序',
  columnMenuSortDesc: '降序',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `${count} 个生效的过滤条件`,
  columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: 'Sort',

  // Rows selected footer text
  footerRowSelected: (count) => `已选择${count.toLocaleString()}行`,
  // Total rows footer text
  footerTotalRows: '总行数:',

  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: '选择列',

  // Boolean cell text
  booleanCellTrueLabel: 'true',
  booleanCellFalseLabel: 'false',
};

export default LOCALE_TEXT;
