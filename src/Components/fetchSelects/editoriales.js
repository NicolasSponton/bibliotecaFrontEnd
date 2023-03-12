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

    return (
        <Select 
            showSearch 
            placeholder="Editorial..." 
            value={value} 
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
            options={data.map(editorial => ({value: editorial.id, label: editorial.editorial}))}
        />
    )
}

export default  SelectEditorial