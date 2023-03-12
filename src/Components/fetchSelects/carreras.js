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

    return (
        <Select 
            showSearch 
            placeholder="Carrera..." 
            value={value} 
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
            options={data.map(carrera => ({value: carrera.id, label: carrera.carrera}))}
        />
    )
}

export default  SelectCarrera