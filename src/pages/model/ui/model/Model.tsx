import type { FC } from "react"
import { Outlet } from "react-router";

const Model: FC = () => {
    return (
        <div>
            <h1>Model Page</h1>
            <Outlet />
        </div>
    )
}

export default Model;