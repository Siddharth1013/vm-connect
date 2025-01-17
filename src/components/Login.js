"use client";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation'
import styled from 'styled-components';
import '../app/ui/Login.css';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SignInImageContainer = styled.img`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 50vw;
  float: left;
  height: 100vh;
  object-fit: cover;
`;

const LoginBodyContainer = styled.div`
  // background:;
  width: 50vw;
  float: right;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const H1=styled.h1`
  font-size:3rem !important;
  color:'#20201e';
`

export default function Login() {
    const router = useRouter();

    const onFinish = async(values) => {
        try{
          const res=await fetch('http://localhost:8081/v1/auth/sign-in',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Accept': '*/*',
            },
            body: JSON.stringify(values), 
          })
          if(res.status==200){
            const jsonData = await res.json();
            // console.log(jsonData);
            localStorage.setItem("accessToken",jsonData.accessToken);
            localStorage.setItem("refreshToken",jsonData.refreshToken);
            router.push("/device");
          }
        }
        catch(e){
          console.log(e);
        }
    
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
    <MainContainer>
      <SignInImageContainer src='https://cdn.gamma.app/q64fwhzkuhdqyit/generated-images/LydIWWr1zdX9IrMuhVfG_.jpg'/>
      <LoginBodyContainer>
        <div>
        <H1><span style={{fontSize:'3rem',fontWeight:'500'}}>Welcome to</span><br/> <span style={{color:'#578e7e'}}>ValueConnect</span></H1>
        <Form
            name="basic"
            style={{
            maxWidth: 800,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            className='single-device-form-item'
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input placeholder='Enter Username'/>
            </Form.Item>

            <Form.Item
            // label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            className='single-device-form-item'
            >
            <Input.Password placeholder='Enter Password'/>
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
        </div>
      </LoginBodyContainer>
    </MainContainer>
  )
}
