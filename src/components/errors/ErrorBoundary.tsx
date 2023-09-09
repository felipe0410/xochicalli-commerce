import { Component, ReactNode, PropsWithChildren } from 'react'

interface ErrorBoundaryProps extends PropsWithChildren<{}> {
    fallback: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: any) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}