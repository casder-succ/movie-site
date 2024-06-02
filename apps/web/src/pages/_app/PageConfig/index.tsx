import { FC, ReactNode } from 'react';

import MainLayout from './MainLayout';

type PageConfigProps = {
  children: ReactNode;
};

const PageConfig: FC<PageConfigProps> = ({ children }) => (
  <MainLayout>
    {children}
  </MainLayout>
);

export default PageConfig;
