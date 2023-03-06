import { Card, Spin } from "antd"

function Loading(){

    return (
        <Card style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Spin/>
        </Card>
    )
}

export default Loading