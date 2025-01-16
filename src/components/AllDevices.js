"use client";
import { SearchOutlined,CheckCircleTwoTone,CloseCircleTwoTone } from "@ant-design/icons";
import {AutoComplete ,Button,Input,Table,Space,Tag} from "antd";
import AddDeviceModal from "./AddDeviceModal";
import Link from "next/link";
import { useState } from "react";
import '../app/ui/AllDisplay.css';

const titltStyle={
    color:'black',
    fontSize:'1.3rem',
}

export default function AllDevices() {
    const [options, setOptions] = useState([]);
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
          render: (text) => <Link href={'/device/currentdevice'} style={{color:'black'}} className="device-link">{text}</Link>,
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
      const data = [
        {
          key: '1',
          sno:'1.',
          device: 'Sony Bravia',
          status: 'Online',
          schedule:'Schedule 34'
        },
        {
            key: '2',
            sno:'2.',
            device: 'Samsung Frame TV',
            status: 'Online',
            schedule:'Schedule 1'
        },
        {
            key: '3',
            sno:'3.',
            device: 'Toshiba New Sonic 4K',
            status: 'Offline',
            schedule:'Schedule 2'
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
