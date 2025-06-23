import React from 'react'
import { Modal } from 'antd';
const Notify = ({ showModal, isModalOpen, handleOk, handleCancel, time, question }) => {
  return (
    <>
      <Modal title="Lưu ý" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Bài thi gồm {question} câu hỏi, thời gian làm bài là {time} phút. Bạn có muốn bắt đầu làm bài không?
      </Modal>
    </>
  )
}

export default Notify
