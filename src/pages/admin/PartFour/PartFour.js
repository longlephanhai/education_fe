import { Button, Card, Table } from "antd"
import { useNavigate } from "react-router-dom"


const PartFour = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'File nghe',
      dataIndex: 'audioUrl',
      key: 'audioUrl',
      render: (text, record) => (
        <div>
          <audio className="" controls>
            <source src={record.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`create-question/${record._id}`, { state: { title: record.name, id: record._id } })}>Cập nhật câu hỏi</Button>
          <Button type='default'>Chi tiết câu hỏi</Button>
          <Button type='danger'>Xóa</Button>
        </>
      )
    }
  ]
  return (
    <Card title='Trang quản lý Part 4'>
      <Button type='primary' onClick={() => navigate('create-part4')}>Tạo mới câu hỏi</Button>
      <Table
        columns={columns}
        // dataSource={data}
        rowKey='id'
      />
    </Card>
  )
}

export default PartFour
