import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectLibro({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/libros', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.libros || []));
    },[])

    return <>
    <Select showSearch placeholder="Libro..." value={value} onChange={onChange}>
        {data.map(libro=>(
            <Select.Option key={libro.id} value={libro.id}>{libro.titulo}</Select.Option>
        ))}
    </Select>
    </>
}

export default  SelectLibro