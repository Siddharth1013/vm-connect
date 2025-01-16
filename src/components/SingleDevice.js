"use client";
import styled from 'styled-components'
import { Card,Select,Tooltip,Button,Switch,Form, Slider,TimePicker,Image} from 'antd';
import {DeleteFilled, PlusOutlined ,CheckCircleTwoTone, SaveFilled,SaveTwoTone} from '@ant-design/icons';
import '../app/ui/SingleDevice.css'
import moment from 'moment'
import dayjs from 'dayjs';
import { useState } from 'react';
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
export default function SingleDevice() {
  const startTime = dayjs('12:08:23', 'h:mm:ss');
  const endTime = dayjs('12:08:23', 'h:mm:ss');
  const [flag,setFlag]=useState(false);
  const [schedule,setSchedule]=useState("");
  const [tag,setTag]=useState("");
  const onFinish=(values)=>{
    const {kiosk,adb,brightness,volume,ota,uptime,resolution,location}=values;
    const formValues={
      kiosk,
      adb,
      brightness,
      volume,
      ota,
      uptime,
      resolution,
      location,
      schedule:schedule,
      tag:tag
    };
    console.log(values);
    console.log(formValues);
  }
  const onFinishFailed=()=>{
    console.log("Gone");
  }


  const changeFlag=()=>(setFlag(true));

  return (
    <div >
      <TitleDiv>
          <h1 style={{textAlign:'center'}}>Device Name</h1>
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
                <span>Policy : Policy 1</span> <br/>
                <span>UID : ugag-9890-hg-5690</span> <br/>
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
                  onFinish={onFinish} 
                  onFinishFailed={onFinishFailed}
                  className='single-device-form'
                  initialValues={{
                    kiosk: true,
                    adb: false,
                    brightness: 60,
                    volume: 0,
                    ota: true,
                    uptime: [startTime, endTime],
                    resolution: "720",
                    location: true,
                  }}
                >
                  <Form.Item label={<span className='single-device-form-item'>Kiosk Mode</span>} valuePropName="checked" name='kiosk'>
                    <Switch onChange={changeFlag}/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Enable ADB</span>}valuePropName="checked" name='adb'>
                    <Switch onChange={changeFlag}/>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Brightness</span>} style={{width:'60%'}} name='brightness'>
                    <Slider step={10} onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Volume</span>} style={{width:'60%'}} name='volume'>
                    <Slider step={10} onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Recieve OTA Updates</span>} valuePropName="checked" name='ota'>
                    <Switch onChange={changeFlag} />
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Device Uptime</span>} valuePropName="checked" name='uptime'>
                    <TimePicker.RangePicker format={format} onChange={changeFlag}/> 
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Video Resolution</span>} style={{width:'60%'}} name='resolution'>
                    <Select onChange={changeFlag}>
                      <Select.Option value="" ></Select.Option>
                      <Select.Option value="360">360</Select.Option>
                      <Select.Option value="480">480</Select.Option>
                      <Select.Option value="720">720</Select.Option>
                      <Select.Option value="1080">1080</Select.Option>
                      <Select.Option value="4K">4K</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<span className='single-device-form-item'>Geolocation Lockdown</span>} valuePropName="checked" name='location'>
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