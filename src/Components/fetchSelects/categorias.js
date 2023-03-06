import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectCategoria({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/categorias', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.categorias || []));
    },[])

    return <>
    <Select showSearch placeholder="Categoria..." value={value} onChange={onChange}>
        {data.map(categoria=>(
            <Select.Option key={categoria.id} value={categoria.id}>{categoria.categoria}</Select.Option>
        ))}
    </Select>
    </>
}

export default  SelectCategoria