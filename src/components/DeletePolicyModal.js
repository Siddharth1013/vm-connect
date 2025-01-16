"use client";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import styled from 'styled-components';

const DeleteButton=styled(Button)`
  background: rgb(188,24,35);
background: linear-gradient(45deg, rgba(188,24,35,1) 0%, rgba(255,250,236,1) 100%);
  border:2px solid #20201e !important;
  font-size:1.1rem !important;
  &:hover{
    background: rgb(188,24,35) !important;
    background: linear-gradient(45deg, rgba(188,24,35,1) 0%, rgba(255,250,236,1) 100%) !important;
    color:#20201e !important;
    border:2px solid #20201e !important;
  }
`;

const DeletePolicyModal = ({id,st}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 

  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        // try {
        //     const res = await fetch(`http://localhost:8080/users/delete/${id}`, {
        //         method: 'DELETE',
        //         headers:{
        //           'Authorization' : `Bearer ${localStorage.getItem('token')}`
        //         }
        //     });
        //     if(res.status==401){
        //       toast.error("Please login");
        //       localStorage.clear();
        //       return navigate('/login');
        //     }
        //     if (res.ok) {
        //         toast.success(`Profile Deleted`);
        //         if(localStorage.getItem('role')=="ADMIN" && id!=localStorage.getItem('userId'))
        //           return navigate("/allusers");
        //         else{
        //           localStorage.clear();
        //           return navigate("/login");
        //         }
        //     }
        // } 
        // catch (error) {
        //     console.error("Error enrolling in course:", error);
        // } finally {
        //     setConfirmLoading(false); 
        //     setOpen(false); 
        //     form.resetFields();
        // }
      })
      .catch((error) => {
        console.error('Validation Failed:', error);
        setConfirmLoading(false); // Stop the loading in case of an error
      });
    };

  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <DeleteButton onClick={showModal} className='delete-policy'>
        Delete <DeleteTwoTone twoToneColor={'#bc1823'}/>
        </DeleteButton>
        <Modal
            title={<span style={{fontSize:'1.2rem',color:'#20201e'}}>Delete Device Policy</span>}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            width={700}
            okText="Delete"
            okButtonProps={{
              style: { 
                backgroundColor: '#578f7e', 
                border: '2px solid #578e7e', 
                color: '#fffaec', 
                fontWeight: '600'
              }
              
          }}
          cancelButtonProps={{
            style:{
              backgroundColor:'#BC1823',
              color:'#fffaec',
              fontWeight: '600',
              border:'2px solid #BC1823'
            }
          }}
        >
            <Form form={form}> 
                <p>Are you sure to delete the policy?</p>
            </Form>
        </Modal>
        
    </>
  );
};


export default DeletePolicyModal;