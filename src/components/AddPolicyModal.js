"use client";
import { useState } from 'react';
import { Button, Modal,Form,Input,Space,InputNumber,Select,Tooltip,Checkbox,Switch,Slider,TimePicker } from 'antd';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../app/ui/AddModal.css';
import '../app/ui/AddDeviceModal.css';
import dayjs from 'dayjs';
const format = 'HH:mm:ss';

export default function AddPolicyModal() {
    const startTime = dayjs('12:08:23', 'h:mm:ss');
    const endTime = dayjs('12:08:23', 'h:mm:ss');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [form] = Form.useForm(); 

    const handleOk = () => {
      form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
          console.log(values);
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    const showModal = () => {
      setOpen(true);
    };
    return (
      <>
        <Button type="primary" onClick={showModal} className='add-button'>
          Add Policy <PlusCircleOutlined />
        </Button>
        <Modal
          title={<span style={{fontSize:'1.2rem',color:'#20201e'}}>Add New Policy</span>}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText={"Add Policy"}
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
}
