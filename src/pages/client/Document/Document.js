import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Summary from '../../../API'
import { Button, Col, Input, Row, Space, Table } from 'antd'
import { CiSearch } from 'react-icons/ci'

const Document = () => {
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

  const onButtonClick = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}` 
        }
      });
      if (response.ok) {
        const blob = await response.blob(); 
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileUrl.split('/').pop();
        link.click();
      } else {
        console.error('Failed to fetch the file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <Row gutter={[16, 16]}>
          <Col>
            <Button type='primary' onClick={() => window.open(record.file, '_blank')}>Xem file</Button>
          </Col>
          <Col>
            <Col>
              {/* <a href={record.file } target="_blank" download>Download</a> */}
              <Button type='default' onClick={() => onButtonClick(record.file)}>Tải xuống</Button>
            </Col>
          </Col>
        </Row>

      )
    }
  ]
  return (
    <Table
      style={{ minHeight: `100vh`, marginTop: `20vhp`, marginBottom: '10vh' }}
      columns={columns}
      pagination={{ pageSize: 9 }}
      dataSource={data}
    />
  )
}

export default Document
