import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectAutor({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/autores', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.autores || []));
    },[])

    return <>
    <Select showSearch placeholder="Autor..." value={value} onChange={onChange}>
        {data.map(autor=>(
            <Select.Option key={autor.id} value={autor.id}>{autor.apellido} {autor.nombre}</Select.Option>
        ))}
    </Select>
    </>
}

export default  SelectAutor