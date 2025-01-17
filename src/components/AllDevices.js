"use client";
import { SearchOutlined,CheckCircleTwoTone,CloseCircleTwoTone } from "@ant-design/icons";
import {AutoComplete ,Button,Input,Table,Space,Tag} from "antd";
import AddDeviceModal from "./AddDeviceModal";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import '../app/ui/AllDisplay.css';

const titltStyle={
    color:'black',
    fontSize:'1.3rem',
}

export default function AllDevices() {
    const router=useRouter();
    const [devices,setDevices]=useState({});
    const [options, setOptions] = useState([]);
    const [data,setData]=useState([]);
    const [inp, setInp] = useState("");
    const handleInput =async (value) => {
        setInp(value);
        // if(value.trim().length>0){
        //     const res = await fetch('http://localhost:8080/courses/all');
        //     const data = await res.json();
        //     const opt = data.map(course => ({
        //         label: course.title,
        //         value: course.title,
        //         key: course.id
        //     }));
        //     setOptions(opt);
        // }
        // else{
        //     setOptions([]);
        // }
    };
    
    const handleSelect = (value) => {
        setInp(value); 
    };

    const handleSubmit=()=>{
        console.log(inp);
    }

    useEffect(()=>{
        if(localStorage.getItem('accessToken')==undefined)
            router.push('/login')
        const fetchAllDevices=async()=>{
            const res=await fetch('http://localhost:8081/v1/device/fetch',{
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'session':`${localStorage.getItem('refreshToken')}`,
              },
              });
              const data=await res.json();
              setDevices(data);
              let i=1;
              const dev=data.map(d=>{
                const result={
                    key:d.id,
                    sno:`${i}.`,
                    device:d.deviceName,
                    status:i%2==0?'Online':'Offline',
                    schedule : `Schedule ${i*3}`
                }
                i++;
                return result;
              })
              setData(dev);
        }
        fetchAllDevices();
    },[]);


    const columns = [
        {
            title: <span style={titltStyle}>S.No</span>,
            dataIndex: 'sno',
            key: 'sno',
        },
        {
          title: <span style={titltStyle}>Device</span>,
          dataIndex: 'device',
          key: 'device',
          render: (text,record) => <Link href={`/device/${record.key}`} style={{color:'black'}} className="device-link">{text}</Link>,
        },
        {
          title: <span style={titltStyle}>Status</span>,
          dataIndex: 'status',
          key: 'status',
          render : (text)=><span>{text} {text==='Online'? <CheckCircleTwoTone twoToneColor="#60A563"/> : <CloseCircleTwoTone twoToneColor="#BC1823"/>} </span>
        },
        {
          title: <span style={titltStyle}>Schedule</span>,
          dataIndex: 'schedule',
          key: 'schedule',
        },
      ];
    
    return (
        <div>
            <h1 style={{textAlign:'center'}}>All Devices</h1>
            <div style={{padding:'2%'}}>
                <div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}> {/* Prevent default form submission */}
                        <AutoComplete
                            style={{ width:'90%',height:'3rem',fontSize:'2rem',fontWeight:'600'}}
                            options={options} // Use options based on input value
                            onSearch={handleInput} // Update input value on search
                            onSelect={handleSelect} // Update input value on selection
                            filterOption={true} 
                            value={inp}
                            className="auto-complete"
                        > 
                            <Input className="search-bar"  style={{ height: '3rem', fontSize: '1.2rem', fontWeight: '500'}} placeholder="Search Device" prefix={inp ? <SearchOutlined /> : <SearchOutlined style={{color:'#BFBFBF'}}/>}/>
                        </AutoComplete>
                        <AddDeviceModal/>       
                    </form>
                </div>
                <br/><br/>
            <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}
