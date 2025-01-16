"use client";
import { useEffect, useState } from 'react';
import { Button, Modal,Form,Input,Space,InputNumber,Select,Tooltip,Checkbox,Switch,Slider,TimePicker } from 'antd';
import { PlusOutlined,PlusCircleTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import '../app/ui/AddModal.css'
import '../app/ui/AddDeviceModal.css';
import dayjs from 'dayjs';
const format = 'HH:mm:ss';

//modalText1,open1,confirmLoading1 - To open 'Add Device' modal
//modalText2,open2,confirmLoading2 - To open the next modal related to configuring new device

export default function AddDeviceModal() {
    const startTime = dayjs('12:08:23', 'h:mm:ss');
    const endTime = dayjs('12:08:23', 'h:mm:ss');
    const [open1, setOpen1] = useState(false);
    const [confirmLoading1, setConfirmLoading1] = useState(false);
    const [modalText1, setModalText1] = useState('Content of the modal');
    const [open2, setOpen2] = useState(false);
    const [confirmLoading2, setConfirmLoading2] = useState(false);
    const [modalText2, setModalText2] = useState('Content of the modal');
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [form] = Form.useForm(); 

    const [tags,setTags]=useState({});
    const [policyId,setPolicyId]=useState(-1);

    useEffect(()=>{
      const fetchAllTags=async()=>{
        const res=await fetch('http://localhost:8081/v1/tag/fetch',{
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'session':`${localStorage.getItem('refreshToken')}`,
              },
        });
        const data=await res.json();
        console.log(data);
        setTags(data);
      }
      fetchAllTags();
    },[]);

    const handleTagSelection=(values)=>{
      // setTagId(values);
      console.log(tags);
    }

    const handleOk2 = () => {
      form
      .validateFields()
      .then((values) => {
        setConfirmLoading2(true);
          console.log(values);
          setOpen2(false);
          setConfirmLoading2(false);
          form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    };

    const handleCancel2 = () => {
      console.log('Clicked cancel button');
      setOpen2(false);
    };

    const showModal1 = () => {
      setOpen1(true);
    };
    const handleOk1 = () => {
      // form
      // .validateFields()
      // .then((values) => {
      //   setConfirmLoading(true);
      //   fetch(`localhost:8081/v1/device/validate-code?registrationCode=`, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      //       'Accept': "*/*"
            
      //     },
      //     body: JSON.stringify(values), 
      //   })
      //   .then((res) => {
      //     if(res.status==200){
      //       setConfirmLoading1(false);
      //       setOpen1(false);
      //       setOpen2(true);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //     setConfirmLoading(false);
      //   });
      // })
      // .catch((info) => {
      //   console.log('Validate Failed:', info);
      // });
      setConfirmLoading1(false);
      setOpen1(false);
      setOpen2(true);
    };
    const handleCancel1 = () => {
      console.log('Clicked cancel button');
      setOpen1(false);
    };

    return (
      <>
        <Button type="primary" onClick={showModal1} className='add-button'>
          Add Device <PlusCircleOutlined />
        </Button>
        <Modal
          title={<span style={{fontSize:'1.2rem',color:'#20201e'}}>Register Your Device</span>}
          open={open1}
          onOk={handleOk1}
          confirmLoading={confirmLoading1}
          onCancel={handleCancel1}
          okText={"Add Device"}
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
            <div>
                <ul style={{fontFamily:'poppins',fontSize:'1rem',paddingLeft:'5%'}}>
                    <li>Enter the 9-digit registration code displayed on your device.</li>
                    <li>The device registration code will only be valid for 5 minutes.</li> 
                    <li>After 5 minutes the registration code will be refreshed.</li>
                </ul>
            </div>
            <br/>
            <Form form={form}>
                <Form.Item label={<span className='single-device-form-item'>Enter Registration Code</span>} name="reg_code" rules={[{required: true,message: 'Please enter the code!',},]} style={{fontWeight:'500'}}>
                    <Input placeholder='XXXXXXXXX'/>
                </Form.Item>
            </Form>
        </Modal>

        <Modal
          
          title="Provision Device"
          open={open2}
          onOk={handleOk2}
          confirmLoading={confirmLoading2}
          onCancel={handleCancel2}
        >
          <Form
            name="basic"
            form={form}
            autoComplete="off"
            style={{fontFamily:'poppins'}}
          >
            <Form.Item
              
              label={<span className='single-device-form-item'>Device Name</span>}
              name="deviceName"
              rules={[
                {
                  required: true,
                  message: 'Please enter device name!',
                },
              ]}
            >
              <Input placeholder="Device Name"/>
            </Form.Item>
            <Form.Item
                label={<span className='single-device-form-item'>Location Coordinates</span>}
                name="coordinates"
                rules={[{ required: true, message: 'Please enter the coordinates!' }]}
            >
              <Space>
                  <Form.Item
                      name="latitude"
                      noStyle
                      rules={[{ required: true, message: 'Please enter the latitude!' }]}
                  >
                      <InputNumber placeholder="Latitude" />
                  </Form.Item>

                  <Form.Item
                      name="longitude"
                      noStyle
                      rules={[{ required: true, message: 'Please enter the longitude!' }]}
                  >
                      <InputNumber placeholder="Longitude" style={{width:'58%'}}/>
                  </Form.Item>
              </Space>
            </Form.Item>
            <div style={{display:'flex',alignItems:'start'}}>
              <Form.Item label={<span className='single-device-form-item'>Device Tag</span>} name="tag" rules={[{ required: true, message: 'Please select a tag!' }]}>
                <Select style={{width:300}} placeholder='Device Tag' onSelect={handleTagSelection}>
                  <Select.Option value="360">360</Select.Option>
                  <Select.Option value="480">480</Select.Option>
                  <Select.Option value="720">720</Select.Option>
                  <Select.Option value="1080">1080</Select.Option>
                  <Select.Option value="4K">4K</Select.Option>
                </Select>
              </Form.Item>&nbsp;&nbsp;
              <Tooltip title="Add New Tag">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size='default' className='plus-button'/>
              </Tooltip>
            </div>
            <div style={{display:'flex',alignItems:'start'}}>
              <Form.Item label={<span className='single-device-form-item'>Device Policy</span>} name="policy" rules={[{ required: true, message: 'Please select a policy!' }]}>
                <Select style={{width:300}} placeholder='Device Policy'>
                  <Select.Option value=""></Select.Option>
                  <Select.Option value="360">360</Select.Option>
                  <Select.Option value="480">480</Select.Option>
                  <Select.Option value="720">720</Select.Option>
                  <Select.Option value="1080">1080</Select.Option>
                  <Select.Option value="4K">4K</Select.Option>
                </Select>
              </Form.Item>
              &nbsp;&nbsp;
              <Tooltip title="Add New Policy">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size='default' className='plus-button'/>
              </Tooltip>
            </div>
            
            <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} name='enabledDeviceLevelPolicy'>
              {<span className='single-device-form-item'>Modify Policy For This Device</span>}
            </Checkbox>
            <div style={{display:componentDisabled==false?'none':'',pointerEvents: !componentDisabled ? 'none' : 'auto', opacity: !componentDisabled ? 0.5 : 1,}}>
              <br/>
                <Form.Item label={<span className='single-device-form-item'>Kiosk Mode</span>} valuePropName="checked" name='exitLockTaskMode'>
                    <Switch/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Enable ADB</span>} valuePropName="checked" name='enableAdb'>
                    <Switch />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Brightness</span>} style={{width:'60%'}} name='brightness'>
                    <Slider step={10} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Volume</span>} style={{width:'60%'}} name='volume'>
                    <Slider step={10}/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Recieve OTA Updates</span>} valuePropName="checked" name='checkForUpdates'>
                    <Switch />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Device Uptime</span>} valuePropName="checked" name='uptime' rules={[{ required: true, message: 'Please set the device uptime' }]}>
                    <TimePicker.RangePicker format={format} /> 
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Video Resolution</span>} style={{width:'60%'}} name='resolution'>
                    <Select>
                      <Select.Option value=""></Select.Option>
                      <Select.Option value="360">360</Select.Option>
                      <Select.Option value="480">480</Select.Option>
                      <Select.Option value="720">720</Select.Option>
                      <Select.Option value="1080">1080</Select.Option>
                      <Select.Option value="4K">4K</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Geolocation Lockdown</span>} valuePropName="checked" name='geolocationLockdown'>
                    <Switch />
                  </Form.Item>
            </div>
        </Form>
            
        </Modal>
        
      </>
    );
}
