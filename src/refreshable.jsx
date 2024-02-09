import React, {Component} from 'react';

export default function refreshable(WrappedComponent) {

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        render: true
      }
    }

    onBeforeUnload = () => {
      this.setState({render: false});
    }

    componentDidMount() {
      window.addEventListener('beforeunload', this.onBeforeUnload);
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }

    render() {
      return this.state.render && <WrappedComponent {...this.props} />
    }
  };
}
