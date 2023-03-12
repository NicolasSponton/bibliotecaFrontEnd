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

    return (
        <Select 
            showSearch 
            placeholder="Autor..." 
            value={value} 
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
            options={data.map(autor => ({value: autor.id, label: autor.apellido + " " + autor.nombre}))}
        />
    )
}

export default  SelectAutor