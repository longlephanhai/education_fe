/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
const Role = () => {
  const navigate = useNavigate()
  const permissions = useSelector(state => state.role)
  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  console.log("per", permissions);
  // Kiểm tra quyền truy cập sau khi `permissions` được cập nhật
  useEffect(() => {
    if (permissionsArray.length > 0) {
      if (!permissionsArray?.includes('roles_view')) {
        navigate('/unauthorized');
      }
    }
  }, [permissionsArray, navigate]);
  const token = localStorage.getItem('access_token')
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getRoles.url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(Summary.deleteRole.url + `${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.statusCode === 200) {
        toast.success(response.data.message)
        fetchApi()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const colums = [
    {
      title: "Tên nhóm quyền",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => navigate(`update-role/${record._id}`)}>Sửa</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>Xóa</Button>
        </div>
      )
    }
  ]
  return (
    <Card title="Quản lý nhóm quyền">
      <Button type="primary" style={{ marginBlock: 20 }} onClick={() => navigate('create-role')}>+Tạo nhóm quyền</Button>
      <Table
        dataSource={data}
        columns={colums}
      />
    </Card>
  )
}

export default Role
