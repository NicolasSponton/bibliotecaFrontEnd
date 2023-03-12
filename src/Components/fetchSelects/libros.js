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

    return (
        <Select 
            showSearch 
            placeholder="Libro..." 
            value={value} 
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
            options={data.map(libro => ({value: libro.id, label: libro.titulo}))}
        />
    )
}

export default  SelectLibro