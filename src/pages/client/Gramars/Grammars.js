import { Button, Card, Input, Space, Table } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Summary from '../../../API';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
const Grammars = () => {
  const navigate = useNavigate()
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
          <Button type='primay' onClick={() => navigate(`${record.slug}`)}>Xem</Button>
        </div>
      )
    }
  ]
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '100%', maxHeight: '100vh'}}>
        <Table
          columns={columns}
          pagination={{ pageSize: 9 }}
          dataSource={data}
        />
      </Card>
    </div>
  )
}

export default Grammars
