import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';
import  { FC, ReactNode } from "react";

type TProtectedRoute = {
  children: any
  path: string
  exact: boolean
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const userAuth = useSelector(state => state.authUser.userAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuth ?
          (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
      }
    />
  );
} 