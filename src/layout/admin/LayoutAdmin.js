/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { FaBookAtlas } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings, MdOutlineQuiz } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { TbVocabulary } from "react-icons/tb";
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbTextGrammar } from "react-icons/tb";
import Summary from '../../API';
import { useDispatch } from 'react-redux';
import { role } from '../../action/role.action';
import { FaAssistiveListeningSystems, FaBookReader, FaWarehouse } from "react-icons/fa";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";
import { LuListEnd } from "react-icons/lu";
import { GrAssistListening } from "react-icons/gr";
import { SiQuizlet } from "react-icons/si";
const { Header, Sider, Content } = Layout;
const LayoutAdmin = () => {
  const checkAccessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (!checkAccessToken) {
      window.location.href = '/admin/sign-in';
    }
  }, [])
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState({});
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getRoleAdmin.url, {
        headers: {
          'Authorization': `Bearer ${checkAccessToken}`
        }
      })
      const profile = await axios.get(Summary.getProfile.url, {
        headers: {
          'Authorization': `Bearer ${checkAccessToken}`
        }
      })
      setUser(profile?.data?.data);
      if (response.data.data.permissions.length > 0) {
        setPermissions(response.data.data.permissions);
      }

    } catch (error) {
      console.log(error?.response?.data?.message);
      window.location.href = '/admin/sign-in';
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    fetchApi();
  }, [])
  console.log(user);


  useEffect(() => {
    if (permissions.length > 0) {
      dispatch(role(permissions));
    }
  }, [permissions, dispatch]);




  return (
    <Layout style={{ width: 'auto', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ padding: '20px', margin: '20px' }}>
          <img src={user?.avatar} width={100} height={100} style={{ borderRadius: '50%', objectFit: 'cover' }} alt='logo' />
          <div style={{ color: 'white' }}>{user?.name}</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {
            permissions?.includes('accounts_view') &&
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="user">Tài khoản</Link>
            </Menu.Item>
          }

          {
            permissions?.includes('vocab_view') &&
            <Menu.Item key="2" icon={<TbVocabulary />}>
              <Link to="vocabulary">Từ vựng</Link>
            </Menu.Item>
          }
          {
            permissions?.includes('grammar_view') &&
            <Menu.Item key="5" icon={<TbTextGrammar />}>
              <Link to="grammar">Ngữ pháp</Link>
            </Menu.Item>
          }
          {
            permissions?.includes('roles_view') &&
            <Menu.Item key="3" icon={<MdOutlineAdminPanelSettings />}>
              <Link to="role">Nhóm quyền</Link>
            </Menu.Item>
          }
          {
            permissions?.includes('roles_permissions') &&
            <Menu.Item key="4" icon={<FaUnlockKeyhole />}>
              <Link to="permissions">Phân quyền</Link>
            </Menu.Item>
          }
          {
            permissions?.includes('test_view') &&
            <Menu.Item key="6" icon={<FaBookAtlas />}>
              <Link to="exam">Bộ đề</Link>
            </Menu.Item>
          }
          <Menu.SubMenu key="sub_exam" icon={<MdOutlineQuiz />} title="Parts">
            {
              <Menu.Item key="7" icon={<AiFillPicture />}>
                <Link to="part-1">Part 1</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="8" icon={<LuListEnd />}>
                <Link to="part-2">Part 2</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="9" icon={<GrAssistListening />}>
                <Link to="part-3">Part 3</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="10" icon={<FaAssistiveListeningSystems />}>
                <Link to="part-4">Part 4</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="11" icon={<MdOutlineQuiz />}>
                <Link to="part-5">Part 5</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="12" icon={<SiQuizlet />}>
                <Link to="part-6">Part 6</Link>
              </Menu.Item>
            }
            {
              <Menu.Item key="13" icon={<FaBookReader />}>
                <Link to="part-7">Part 7</Link>
              </Menu.Item>
            }
          </Menu.SubMenu>
          <Menu.Item key="14" icon={<HiOutlineDocumentArrowDown />}>
            <Link to="doc">Tài liệu</Link>
          </Menu.Item>
          {/* <Menu.Item key="15" icon={<FaWarehouse />}>
            <Link to="about-us">Về chúng tôi</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'relative'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Button
            type="primary"
            style={{
              position: 'absolute',
              right: 25,
              top: 20
            }}
            onClick={() => {
              localStorage.removeItem('access_token');
              window.location.href = '/admin/sign-in';
            }}
          >
            Đăng xuất
          </Button>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
