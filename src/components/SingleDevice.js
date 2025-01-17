"use client";
import styled from 'styled-components'
import { Card,Select,Tooltip,Button,Switch,Form, Slider,TimePicker,Image} from 'antd';
import {DeleteFilled, PlusOutlined ,CheckCircleTwoTone, SaveFilled,SaveTwoTone} from '@ant-design/icons';
import '../app/ui/SingleDevice.css'
import dayjs from 'dayjs';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'antd/es/form/Form';
const format = 'HH:mm:ss';

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const TitleDiv=styled.div`
  padding: 0 10%;
  font-family:poppins;
  display:flex;
  justify-content:center;
  align-items:center;
`;
export default function SingleDevice({id}) {
  const startTime = dayjs('00:00:00', 'h:mm:ss');
  const endTime = dayjs('00:00:00', 'h:mm:ss');
  const [flag,setFlag]=useState(false);
  const [schedule,setSchedule]=useState("");
  const [tag,setTag]=useState("");
  const [device,setDevice]=useState({});
  const [policy,setPolicy]=useState({});
  const router=useRouter();
  const [form] = Form.useForm(); 

  useEffect(()=>{
          if(localStorage.getItem('accessToken')==undefined)
              router.push('/login')
          const fetchDevice=async()=>{
              const res=await fetch(`http://localhost:8081/v1/device/fetch-device?id=${id}`,{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                  'session':`${localStorage.getItem('refreshToken')}`,
                },
              });
              const data=await res.json();
              setDevice(data);
              if(data.enabledDeviceLevelPolicy==true)
                setPolicy(data.policy);
              else if(data.tagId!=undefined)
                setPolicy(data.tag.policy);
              else if(data.policy)
                setPolicy(data.policy);
              else
                setPolicy(null);
              console.log(data.policy)
          }
          fetchDevice();
      },[id,router]);

  useEffect(() => {
    if (policy) {
      form.setFieldsValue({
        exitLockTaskMode: policy.exitLockTaskMode,
        enableAdb: policy.enableAdb,
        brightness: policy.brightness || 50,
        volume: policy.volume || 50,
        uptime : [policy && policy.bootTime ? dayjs(policy.bootTime, "hh:mm:ss") : startTime,policy&& policy.shutDownTime ? dayjs(policy.shutDownTime, 'hh:mm:ss') : endTime],
        checkForUpdates: policy.checkForUpdates,
        resolution: policy.resolution,
        geolocationLockdown: policy.geolocationLockdown,
      });
    }
  }, [policy, form]);

  const onFinish=(values)=>{
    const {exitLockTaskMode,enableAdb,brightness,volume,checkForUpdates,uptime,resolution,geolocationLockdown}=values;
    const formValues={
      
      exitLockTaskMode,
      enableAdb,
      brightness,
      volume,
      checkForUpdates,
      uptime,
      resolution,
      geolocationLockdown
    
      // schedule:schedule,
      // tag:tag
    };
    console.log(formValues);
  }
  const onFinishFailed=()=>{
    console.log("Gone");
  }


  const changeFlag=()=>(setFlag(true));

  return (
    <div >
      <TitleDiv>
          <h1 style={{textAlign:'center'}}>{device.deviceName}</h1>
          <Button variant="solid" className='delete-button'>
            Delete <DeleteFilled/>
          </Button>     
      </TitleDiv>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'flex-start'}}>
        <div style={{width:'30%'}}> 
            <Card styles={{ body:{paddingTop: 10}}} className='card-single-device'>
                <div>
                  <Image src="https://a.storyblok.com/f/47007/1200x628/a4a4843482/ad-glossary-meta.png" alt=""  style={{width:'100%'}}/>
                </div><br/>
                <span>Status : Online <CheckCircleTwoTone twoToneColor="#60A563"/> </span> <br/>
                {/* : <CloseCircleTwoTone twoToneColor="#BC1823"/>< */}
                <span>Last Screenshot Timestamp : 09-01-2025, 03:09 p.m</span> <br/><br/>
                <Select
                  style={{
                    width: '75%',
                  }}
                  placeholder={<span style={{fontSize:'1rem'}}>Schedule</span>}
                  onChange={(value)=>(
                    setSchedule(value)
                  )}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}/>&nbsp;&nbsp;
                  <Tooltip title="Add New Schedule">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />}  size='default' className='plus-button'/>
                  </Tooltip>
            </Card>
            <br/>
            <Card styles={{ body:{paddingTop: 0}}} className='card-single-device'>
                <h3>Device Specifications</h3>
                <span>Policy : {policy?policy.policyName:'N/A'}</span> <br/>
                <span>UUID : {device.uuid}</span> <br/>
                <span>Android Version : 13</span><br/>
                <span>Memory Used : 343.21 MB</span><br/>
                <span>Total Memory : 2.1 GB</span><br/>
                <br/>
                <Select
                  style={{
                    width: '75%',
                  }}
                  placeholder={<span style={{fontSize:'1rem'}}>Device Tag</span>}
                  onChange={(value)=>(
                    setTag(value)
                  )}
                  value={device.tag && device.tag.tagName?device.tag.tagName:""}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                ]}/>&nbsp;&nbsp;
                <Tooltip title="Add New Tag">
                  <Button type="primary" shape="circle" icon={<PlusOutlined color='#3d3d3d'/>} size='default' className='plus-button'/>
                </Tooltip>
                <br/>
            </Card>
            <br/>
        </div>
        <div style={{fontFamily:'poppins',width:'60%'}}>
          <Card styles={{ body:{paddingTop: 0}}} className='card-single-device'>
                <h2 style={{textAlign:'center',fontSize:'1.6rem'}}>Device Policy</h2>
                <Form 
                  form={form}
                  onFinish={onFinish} 
                  onFinishFailed={onFinishFailed}
                  className='single-device-form'
                >
                  <Form.Item label={<span className='single-device-form-item'>Exit Lock Task Mode</span>} valuePropName="checked" name='exitLockTaskMode'>
                    <Switch onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Enable ADB</span>} valuePropName="checked" name='enableAdb'>
                    <Switch onChange={changeFlag}/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Brightness</span>} style={{width:'60%'}} name='brightness'>
                    <Slider step={10} onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Volume</span>} style={{width:'60%'}} name='volume'>
                    <Slider step={10} onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Check For Updates</span>} valuePropName="checked" name='checkForUpdates'>
                    <Switch onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Device Uptime</span>} valuePropName="checked" name='uptime'>
                    <TimePicker.RangePicker format={format} onChange={changeFlag}/> 
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Video Resolution</span>} style={{width:'60%'}} name='resolution'>
                    <Select onChange={changeFlag} placeholder="Select Resolution">
                      <Select.Option value="360">360</Select.Option>
                      <Select.Option value="480">480</Select.Option>
                      <Select.Option value="720">720</Select.Option>
                      <Select.Option value="1080">1080</Select.Option>
                      <Select.Option value="4K">4K</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Geolocation Lockdown</span>} valuePropName="checked" name='geolocationLockdown'>
                    <Switch  onChange={changeFlag}/>
                  </Form.Item>
                  <div style={{width:'100%',display:'flex',flexDirection:'row-reverse',paddingRight:'10%'}}>
                    <Form.Item>
                      <Button htmlType="submit" className="single-device-save" style={{display:(flag==false && schedule.length==0 && tag.length==0)?'none':''}}>Save <SaveFilled/></Button>
                    </Form.Item>
                  </div>
                  
                </Form>
            </Card>
        </div>
      </div>
    </div>
  )
}