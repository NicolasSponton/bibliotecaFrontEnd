import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectCarrera({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/carreras', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.carreras || []));

    },[])

    return <>
    <Select allowClear showSearch placeholder="Carrera..." value={value} onChange={onChange}>
        {data.map(carrera=>(
            <Select.Option key={carrera.id} value={carrera.id}>{carrera.carrera}</Select.Option>
        ))}
    </Select>
    </>
}

export default  SelectCarrera