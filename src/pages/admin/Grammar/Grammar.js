/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Input, Space, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Summary from '../../../API'
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
const Grammar = () => {
  const navigate = useNavigate()
  const permissions = useSelector(state => state.role)
  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  console.log("per", permissions);
  // Kiểm tra quyền truy cập sau khi `permissions` được cập nhật
  useEffect(() => {
    if (permissionsArray.length > 0) {
      if (!permissionsArray?.includes('grammar_view')) {
        navigate('/unauthorized');
      }
    }
  }, [permissionsArray, navigate]);

  const [data, setData] = useState([]);
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.findAllGrammar.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(Summary.deleteGrammar.url + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(response.data.message)
      fetchApi()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm kiếm tiêu đề"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<CiSearch />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type='default' onClick={() => navigate(`${record.slug}`)}>Chi tiết</Button>
          <Button type='primary' onClick={() => navigate(`update-grammar/${record.slug}`)}>Cập nhật</Button>
          <Button type='danger' onClick={() => handleDelete(record._id)}>Xóa</Button>
        </div>
      )
    }
  ]

  return (
    <Card title="Trang quản lý ngữ pháp ">
      <Button type='primary' onClick={() => navigate('create-grammar')} style={{ marginBlock: 20 }}>
        Cập nhật ngữ pháp
      </Button>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
      />
    </Card>
  )
}

export default Grammar
