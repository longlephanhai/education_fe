import React from 'react'
import {  Modal } from 'antd';
const Notify = ({ showModal, isModalOpen, handleOk, handleCancel }) => {
  return (
    <>
      <Modal title="Lưu ý" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Bài thi gồm 200 câu hỏi, thời gian làm bài là 120 phút. Bạn có muốn bắt đầu làm bài không?
      </Modal>
    </>
  )
}

export default Notify
