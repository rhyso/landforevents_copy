import React, {Component, Fragment} from "react";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class AdminMenu extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256 }}
            >
                <Menu.Item key="1"><Link to={"/admin/"}>Home</Link></Menu.Item>
                <Menu.Item key="1"><Link to={"/admin/EWvoW0Dncoc7HNlnFyBkOYCTFlV/profile"}>Profile</Link></Menu.Item>

                <Menu.Item key="1"><Link to={"/admin/your-listed-land"}>Advertised Land</Link></Menu.Item>

                <SubMenu key="sub1"
                    title={
                        <span><Icon type="book" />
                        <span><b>Your land for hire</b></span>
                        </span>
                    }
                >
                    <Menu.Item key="5" disabled={true}>Current Bookings</Menu.Item>

                    <Menu.Item key="1"><Link to={"/admin/land/add"}>Add land for hire</Link></Menu.Item>
                    {/* <Menu.Item key="2"><Link to={"/admin/land/images/add"}>Add images </Link></Menu.Item> */}
                    <Menu.Item key="3">Edit listing</Menu.Item>
                    <Menu.Item key="4" disabled={true}>Update listings</Menu.Item>
                    <Menu.Item key="5" disabled={true}>Remove a listing</Menu.Item>
                    {/* <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7"><Link to={"/admin/land/images/add"}>Add Images</Link></Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu> */}
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
              <Icon type="appstore" />
              <span>Your profile</span>
            </span>
                    }
                >
                    <Menu.Item disabled={true} key="5">Update details</Menu.Item>
                    <Menu.Item disabled={true} key="6">Deactivate Account</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
              <Icon type="setting" />
              <span>Account</span>
            </span>
                    }
                >
                    <Menu.Item disabled={true} key="9">Payment details</Menu.Item>
                    <Menu.Item disabled={true} key="10">Terms of Agreement</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default withRouter(AdminMenu);
