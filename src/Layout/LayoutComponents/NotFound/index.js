import { Result, Button } from "antd"
import { useRouteError } from "react-router-dom"

function NotFound(){

    return (
        <Result
            status="404"
            title="404"
            subTitle="Lo Sentimos, la pagina que buscas no existe."
            extra={<Button type="primary">Volver</Button>}
        />
    )
}

export default NotFound