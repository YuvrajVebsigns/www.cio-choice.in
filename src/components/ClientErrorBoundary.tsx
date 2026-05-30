'use client';

import React from 'react';

type Props = { children: React.ReactNode };

export default class ClientErrorBoundary extends React.Component<
  Props,
  { hasError: boolean; error?: Error | null }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // log to console for developer
    // eslint-disable-next-line no-console
    console.error('ClientErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h3>Something went wrong while rendering this section.</h3>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              display: 'inline-block',
              maxWidth: '80%',
            }}
          >
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
