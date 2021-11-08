import { canIUse } from '../../components/CanIUse';
import { Menu, Icon } from 'ant-design-vue';
export default {
    name: 'Navigation',
    data() {
        return {
            openKeys: []
        }
    },
    computed: {
        menu() {
            return this.$router.options.routes.find(
                rootRoute => rootRoute.path === "/"
            ).children
        },
        rootKeys() {
            return this.menu
                .filter(menu => menu.children !== undefined)
                .map(menu => menu.meta.id);
        }
    },
    methods: {
        handlePush(path) {
            this.$router.push(path).catch(error => { });
        },
        handleOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (this.rootKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        }
    },
    render() {
        return <Menu
            theme="dark"
            mode="inline"
            style="margin-bottom: 48px"
            openKeys={this.openKeys}
            onOpenChange={this.handleOpenChange}>
            {
                this.menu.map(menu => {
                    // 如果该路由对象中没有children，不在菜单中隐藏且 route.meta.authCode 通过了权限的验证, 则认为该路由是一个导航菜单项
                    const isSingleNav = menu.children === undefined && !menu.meta.hide && canIUse({ code: menu.meta.authCode });
                    // 如果该路由对象上有children，不在菜单中隐藏且 route.meta.authCode 通过了权限验证, 则认为该路由是一个可展开的导航菜单
                    const isRootNav = menu.children !== undefined && !menu.meta.hide && canIUse({ code: menu.meta.authCode });
                    // 如果是导航菜单项，渲染一个可以点击跳转的 Menu.Item 组件
                    if (isSingleNav) {
                        return <Menu.Item key={menu.meta.id} onClick={() => {
                            this.handlePush(`/${menu.path}`);
                        }}>
                            <Icon type={menu.meta.icon} />
                            <span>{menu.meta.title}</span>
                        </Menu.Item>
                    }
                    // 如果是可展开的导航菜单，渲染一个可以展开更多子项的 Menu.SubMenu
                    if (isRootNav) {
                        return <Menu.SubMenu key={menu.meta.id}>
                            <span slot="title">
                                <Icon type={menu.meta.icon} />
                                <span>{menu.meta.title}</span>
                            </span>
                            {
                                menu.children.map(child => {
                                    if (!child.meta.hide && canIUse({ code: child.meta.authCode })) {
                                        return <Menu.Item key={child.meta.id} onClick={() => {
                                            this.handlePush(`/${menu.path}/${child.path}`);
                                        }}>
                                            {child.meta.title}
                                        </Menu.Item>
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Menu.SubMenu>
                    }
                    // 其它情况不渲染
                    return null;
                })
            }
        </Menu>
    }
}