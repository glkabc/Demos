import Vue from 'vue';
import {
	Pagination,
	Button,
	Modal,
	notification,
	Layout,
	Icon,
	Checkbox,
	Popconfirm,
	Switch,
	TimePicker,
	DatePicker,
	Tooltip,
	Affix,
	Menu,
	Form,
	Row,
	Input,
	InputNumber,
	Radio,
	Select,
	Cascader,
	Popover,
	Table,
	Tag,
	Timeline,
	Divider,
	Col,
	Skeleton,
	Empty,
	Avatar,
	TreeSelect,
	Tree,
	Upload,
	Badge,
	Tabs,
	ConfigProvider,
	Drawer,
	Transfer,
	Dropdown,
	List,
	Card,
	message
} from 'ant-design-vue';

Vue.prototype.$notification = notification;
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;


Vue.use(ConfigProvider);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Popconfirm);
Vue.use(Switch);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Affix);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Row);
Vue.use(Modal);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Cascader);
Vue.use(Popover)
Vue.use(Table);
Vue.use(Tag);
Vue.use(Timeline);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Skeleton);
Vue.use(Empty);
Vue.use(Avatar);
Vue.use(TreeSelect);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Tabs);
Vue.use(Drawer);
Vue.use(Transfer);
Vue.use(Dropdown);
Vue.use(List);
Vue.use(Card)