/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Summary from '../../../API';
import { Button, Card, Checkbox, Col, Form, Row, Table } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Permissions = () => {
  const navigate = useNavigate()
  const permission = useSelector(state => state.role)
  const permissionsArray = Array.isArray(permission) ? permission : [];
  console.log("per", permission);
  // Kiểm tra quyền truy cập sau khi `permissions` được cập nhật
  useEffect(() => {
    if (permissionsArray.length > 0) {
      if (!permissionsArray?.includes('roles_permissions')) {
        navigate('/unauthorized');
      }
    }
  }, [permissionsArray, navigate]);

  const token = localStorage.getItem('access_token');
  const [data, setData] = useState([])
  const [permissions, setPermissions] = useState({});
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getRoles.url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(response.data.data)
      const initialPermissions = {};
      response.data.data.forEach((role) => {
        initialPermissions[role.title] = {};
        role.permissions.forEach((permission) => {
          initialPermissions[role.title][permission] = true;
        });
      });
      setPermissions(initialPermissions);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])


  const handleCheckboxChange = (checked, roleName, permissionName) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [roleName]: {
        ...prevPermissions[roleName],
        [permissionName]: checked,

      },
    }));
  };
  const columns = [
    {
      title: 'Tính năng',
      dataIndex: 'feature',
      key: 'feature',
    },
    ...data.map((item) => ({
      title: item.title,
      key: item._id,
      permissions: item.permissions,
      render: (_, record) => {
        if (record.feature.type === 'b') {
          return null;
        }
        return (
          <Form.Item>
            <Checkbox
              onChange={(e) => handleCheckboxChange(e.target.checked, item.title, record.name)}
              checked={permissions[item.title] ? permissions[item.title][record.name] : false}
            />

          </Form.Item>
        )
      },
    })),
  ];
  const permissionsData = [
    {
      key: '1', feature: <b>Quản lí tài khoản</b>
    },
    {
      key: '2',
      name: 'accounts_view',
      feature: 'Xem danh sách tài khoản',
    },
    {
      key: '3',
      name: 'accounts_create',
      feature: 'Tạo mới tài khoản',
    },
    {
      key: '4',
      name: 'accounts_edit',
      feature: 'Chỉnh sửa tài khoản',
    },
    {
      key: '5',
      name: 'accounts_delete',
      feature: 'Xóa tài khoản',
    },
    {
      key: '6', feature: <b>Quản lí từ vựng</b>
    },
    {
      key: '7',
      name: 'vocab_view',
      feature: 'Xem danh sách từ vựng',
    },
    {
      key: '8',
      name: 'vocab_create',
      feature: 'Thêm mới từ vựng',
    },
    {
      key: '9',
      name: 'vocab_edit',
      feature: 'Chỉnh sửa từ vựng',
    },
    {
      key: '10',
      name: 'vocab_delete',
      feature: 'Xóa từ vựng',
    },
    {
      key: '11', feature: <b>Nhóm quyền</b>
    },
    {
      key: '12',
      name: 'roles_view',
      feature: 'Xem nhóm quyền',
    },
    {
      key: '13',
      name: 'roles_create',
      feature: 'Thêm mới nhóm quyền',
    },
    {
      key: '14',
      name: 'roles_edit',
      feature: 'Chỉnh sửa nhóm quyền',
    },
    {
      key: '15',
      name: 'roles_delete',
      feature: 'Xóa nhóm quyền',
    },
    {
      key: '16',
      name: 'roles_permissions',
      feature: 'Phân quyền nhóm quyền',
    },
    {
      key: '17', feature: <b>Quản lý ngữ pháp</b>
    },
    {
      key: '18',
      name: 'grammar_view',
      feature: 'Xem danh sách ngữ pháp',
    },
    {
      key: '19',
      name: 'grammar_create',
      feature: 'Thêm mới ngữ pháp',
    },
    {
      key: '20',
      name: 'grammar_update',
      feature: 'Chỉnh sửa ngữ pháp',
    },
    {
      key: '21',
      name: 'grammar_delete',
      feature: 'Xóa ngữ pháp',
    },
    {
      key:'22', feature: <b>Quản lý đề thi</b>
    },
    {
      key: '23',
      name:"test_view",
      feature: 'Xem danh sách đề thi',
    },
    {
      key:'24',
      name:"test_create",
      feature: 'Tạo mới đề thi',
    },
    {
      key:'25',
      name:"test_update",
      feature: 'Cập nhật câu hỏi',
    }

  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    try {
      const response = await axios.post(Summary.addPermission.url, permissions, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <Card title="Phân quyền">
      <Form
        form={form}
        className="permissions-form"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row style={{ marginBottom: '20px' }}>
          <Col>
            <Button
              type="primary"
              // disabled={loading}
              htmlType="submit"
              className="permissions-form__submit"
              // loading={loading}
              block
            >
              Lưu
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="table-container">
              <Table
                columns={columns}
                dataSource={permissionsData}
                pagination={false}
                bordered
                scroll={{ y: 350 }}
                className="permissions-form__table"
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Permissions
