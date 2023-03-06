import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectEditorial({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/editoriales', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.editoriales || []));
    },[])

    return <>
    <Select showSearch placeholder="Editorial..." value={value} onChange={onChange}>
        {data.map(editorial=>(
            <Select.Option key={editorial.id} value={editorial.id}>{editorial.editorial}</Select.Option>
        ))}
    </Select>
    </>
}

export default  SelectEditorial