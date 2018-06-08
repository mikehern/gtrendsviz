import React, { Component } from 'react';

class RelatedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.data.length === 0) {
      return true;
    }

    if (nextProps.data !== this.state.data) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevState.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    const { data } = this.state;
    return(
      <div>{JSON.stringify(data)}</div>
    )
  }
}

export default RelatedSearch;