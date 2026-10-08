import { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(e, i) { console.error('ErrorBoundary', e, i); }
    render() {
        if (this.state.hasError)
            return <div style={{ padding: 32 }}><h2>Something went wrong.</h2><button className="btn" onClick={() => location.reload()}>Reload</button></div>;
        return this.props.children;
    }
}