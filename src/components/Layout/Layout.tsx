import React from 'react';
import styles from './Layout.module.css';
import Title from '../Title';

type LayoutProps = React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  sticky?: boolean;
  className?: string;
}>;

export default function Layout({ title, subtitle, sticky, children, className }: LayoutProps){
  return (
    <div className={`${styles.wrap} ${className || ''}`.trim()}>
      <div className={styles.stage}>
        {title ? (
          <div className={sticky ? styles.titleRow : undefined}>
            <Title title={title} subtitle={subtitle} sticky={!!sticky} />
          </div>
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
