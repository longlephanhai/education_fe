import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { Button, Card, Input, Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { toast } from 'react-toastify'
const Doc = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getDoc.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data.map(item => ({
        ...item,
        file: `${process.env.REACT_APP_URL_BACKEND}/${item.file.replace(/\\/g, '/')}`
      })));
    } catch (error) {
      console.log(error);
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
      const response = await axios.delete(Summary.deleteDoc.url + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.data.statusCode === 200) {
        fetchApi()
        toast.success(response.data.message)
      }
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
          <Button type='primary' >Sửa</Button>
          <Button type='danger' onClick={() => handleDelete(record._id)}>Xóa</Button>
          <Button type='default' onClick={()=>window.open(record.file, '_blank')}>Xem file</Button>
        </div>
      )
    }
  ]
  return (
    <Card title="Trang quản lý tài liệu">
      <Button type='primary' onClick={() => navigate('upload')}>+ Tạo mới tài liệu</Button>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
      />
    </Card>
  )
}

export default Doc
