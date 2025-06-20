import type { FC, PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router';

type ProtectedRouteProps = {
    isAllowed: boolean;
    redirectPath?: string;
} & PropsWithChildren;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    isAllowed,
    redirectPath = '/auth',
    children,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};
