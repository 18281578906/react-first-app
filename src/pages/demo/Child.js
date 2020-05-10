import React from 'react';
export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  handClick() {
    this.setState({
      count: this.state.count + 1
    });
  }
  componentWillMount() {
    console.log('will mount');
  }
  componentDidMount() {
    console.log('didi mount');
  }
  //组件传值
  componentWillReceiveProps(newProps) {
    console.log(newProps.name);
  }
  shouldComponentUpdate() {
    console.log('should update');
    return true;
  }
  componentWillUpdate() {
    console.log('will update');
  }
  componentDidUpdate() {
    console.log('did update');
  }
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
      </div>
    );
  }
}
