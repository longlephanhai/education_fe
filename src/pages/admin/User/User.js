/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Table, Button, Card, Avatar, Pagination } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Summary from '../../../API';
import { useSelector } from 'react-redux';
const User = () => {
  const navigate = useNavigate()
  const permissions = useSelector(state => state.role)
  const permissionsArray = Array.isArray(permissions) ? permissions : [];

  useEffect(() => {
    if (permissionsArray.length > 0) {
      if (!permissionsArray?.includes('accounts_view')) {
        navigate('/unauthorized');
      }
    }
  }, [permissionsArray, navigate]);

  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getAllAccounts.url + `?current=${1}&pageSize=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data.result)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(Summary.deleteAccount.url + id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.status === 200) {
        toast.success("Xóa tài khoản thành công")
        fetchApi()
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại")
    }

  }

  const colums = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Avatar src={avatar} alt
          ="avatar" style={{ width: '50px', height: '50px' }} />
      )
    },
    {
      title: "Nhóm quyền",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <div>{record?.role?.title}</div>
      )
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div>
          {
            permissionsArray?.includes('accounts_edit') &&
            <Button type="primary" onClick={() => navigate(`update-account/${record._id}`)}>Sửa</Button>
          }
          {
            permissionsArray?.includes('accounts_delete') &&
            <Button type="danger" onClick={() => handleDelete(record._id)}>Xóa</Button>
          }

        </div>
      )
    }
  ]
  // get current page 
  const [currentPage, setCurrentPage] = useState(1)
  const handleChangePage = async (page) => {
    setCurrentPage(page)
    navigate(`/admin/user?current=${page}&pageSize=10`)
    try {
      const response = await axios.get(Summary.getAllAccounts.url + `?current=${page}&pageSize=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data.result)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Card title="Quản lí tài khoản">
      {
        permissionsArray?.includes('accounts_create') &&
        <Button style={{ marginTop: '20px', marginBottom: '20px' }} type="primary" onClick={() => navigate('create-account')}>Tạo tài khoản</Button>
      }

      <Table
        columns={colums}
        dataSource={data}
        pagination={false}
        style={{ marginBottom: '20px' }}
      />
      <Pagination defaultCurrent={1} current={currentPage} total={data.length + 10} onChange={handleChangePage} />;
    </Card>
  )
}

export default User
