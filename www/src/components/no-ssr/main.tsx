import React from 'react';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('./container'), { ssr: false });

type Props = {
  children: React.ReactNode;
};

export const NoSSR = ({ children }: Props) => <Container>{children}</Container>;
