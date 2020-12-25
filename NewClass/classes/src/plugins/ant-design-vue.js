import Vue from "vue";
import { 
    Button, Menu, Form, Tabs, List,Icon,
    Input,Checkbox,Row,Col ,message,notification,Modal,ConfigProvider,
    Divider,Dropdown,Avatar,Upload,Card,Pagination,Progress,Select,Tooltip,Spin} from "ant-design-vue";
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.use(Button);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(ConfigProvider);
Vue.use(Divider);
Vue.use(Dropdown);
Vue.use(Avatar);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Pagination);
Vue.use(Progress);
Vue.use(Select);
Vue.use(Tooltip);
Vue.use(Spin);

