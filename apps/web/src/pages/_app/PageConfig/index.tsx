import { FC, Fragment, ReactNode } from 'react';

import { LayoutType, RoutePath, routesConfiguration, ScopeType } from 'routes';

import { useRouter } from 'next/router';
import MainLayout from './MainLayout';
import BlankLayout from './BlankLayout';

const layoutToComponent = {
  [LayoutType.MAIN]: MainLayout,
  [LayoutType.UNAUTHORIZED]: Fragment,
  [LayoutType.BLANK]: BlankLayout,
};

const scopeToComponent = {
  [ScopeType.PUBLIC]: Fragment,
  [ScopeType.PRIVATE]: Fragment,
};

type PageConfigProps = {
  children: ReactNode;
};

const PageConfig: FC<PageConfigProps> = ({ children }) => {
  const { route } = useRouter();

  const { scope, layout } = routesConfiguration[route as RoutePath] || {};

  const Scope = scope ? scopeToComponent[scope] : Fragment;
  const Layout = layout ? layoutToComponent[layout] : Fragment;

  return (
    <Scope>
      <Layout>
        {children}
      </Layout>
    </Scope>
  );
};

export default PageConfig;
