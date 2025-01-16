"use client";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input,Switch,Slider,Checkbox,TimePicker,Select} from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { EditTwoTone } from '@ant-design/icons';
const format = 'HH:mm:ss';

const EditButton=styled(Button)`
  background: rgb(87,142,126);
  background: linear-gradient(45deg, rgba(87,142,126,1) 0%, rgba(255,250,236,1) 100%);
  border:2px solid #20201e !important;
  font-size:1.1rem !important;
  &:hover{
    background: rgb(87,142,126) !important;
    background: linear-gradient(45deg, rgba(87,142,126,1) 0%, rgba(255,250,236,1) 100%) !important;
    color:#20201e !important;
    border:2px solid #20201e !important;
  }
`;

const EditPolicyModal = ({details,st}) => {
  const startTime = dayjs('12:08:23', 'h:mm:ss');
  const endTime = dayjs('12:08:23', 'h:mm:ss');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        // fetch(`http://localhost:8080/users/update/${details.id}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json',
            
        //   },
        //   body: JSON.stringify(values), 
        // })
        // .then((data) => {
        //   if(data.status==401){
        //     toast.error("Please login");
        //     localStorage.clear();
        //     return navigate("/login");
        //   }
          
          
        // })
        // .catch((error) => {
        //   console.error('Error:', error);
        //   setConfirmLoading(false); // Stop the loading in case of an error
        // });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <EditButton onClick={showModal}  className='edit-policy'>
        Edit <EditTwoTone twoToneColor={'#587e7e'}/>
        </EditButton>
        <Modal
            title={<span style={{fontSize:'1.2rem',color:'#20201e'}}>Edit Device Policy</span>}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            okText={"Edit"}
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
            <br/>
            <Form name="basic" form={form} autoComplete="off">
                  <Form.Item label={<span className='single-device-form-item'>Policy Name</span>} valuePropName="checked" name='policy_name' rules={[{ required: true, message: 'Please enter policy name!' }]}>
                    <Input placeholder='Enter Policy Name'/>
                  </Form.Item>
                <Form.Item label={<span className='single-device-form-item'>Kiosk Mode</span>} valuePropName="checked" name='kiosk'>
                    <Switch/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Enable ADB</span>} valuePropName="checked" name='adb'>
                    <Switch />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Brightness</span>} style={{width:'60%'}} name='brightness'>
                    <Slider step={10} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Volume</span>} style={{width:'60%'}} name='volume'>
                    <Slider step={10}/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Recieve OTA Updates</span>} valuePropName="checked" name='ota'> 
                    <Switch />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Device Uptime</span>} valuePropName="checked" name='uptime' rules={[{ required: true, message: 'Please schedule the uptime!' }]}>
                    <TimePicker.RangePicker format={format} /> 
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Video Resolution</span>} style={{width:'60%'}} name='resolution' rules={[{ required: true, message: 'Please select resolution!' }]}>
                    <Select placeholder="Select Video Resolution">
                      <Select.Option value="360">360</Select.Option>
                      <Select.Option value="480">480</Select.Option>
                      <Select.Option value="720">720</Select.Option>
                      <Select.Option value="1080">1080</Select.Option>
                      <Select.Option value="4K">4K</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Geolocation Lockdown</span>} valuePropName="checked" name='location'>
                    <Switch />
                  </Form.Item>
        </Form>
        </Modal>
    </>
  );
};


export default EditPolicyModal;