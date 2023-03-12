import { Select } from "antd";
import { useEffect, useState } from "react";
import { MAIN_API } from "../../Config/env";

function SelectAlumno({ value, onChange }){
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch(MAIN_API + '/alumnos', {  
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            },
        })
        .then(res => res.json())
        .then(res => setData(res?.data?.alumnos || []));
    },[])

    return (
        <Select 
            showSearch 
            placeholder="Alumno..." 
            value={value} 
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
            options={data.map(alumno => ({value: alumno.id, label: alumno.apellido + " " + alumno.nombre}))}
        />
    )
}

export default  SelectAlumno