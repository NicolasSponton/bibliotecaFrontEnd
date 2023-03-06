import { Result, Button } from "antd"
import { useRouteError } from "react-router-dom"

function Error(){
    const error = useRouteError()

    return (
        <Result
            status="404"
            title={error.statusText}
            subTitle={error.message}
            extra={<Button type="primary">Volver</Button>}
        />
    )
}

export default Error