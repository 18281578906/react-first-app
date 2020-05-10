import React from 'react';
import { Card, Row, Col, Modal } from 'antd';
import './ui.less';
export default class Gallerys extends React.Component {
  state = {
    visibale: false
  };
  openGellary = img => {
    this.setState({
      visibale: true,
      currentImg: '/gallery/' + img
    });
  };
  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ];
    const imgList = imgs.map(list =>
      list.map((item, index) => (
        <Card
          style={{ marginBottom: 10, cursor: 'pointer' }}
          key={index}
          onClick={() => this.openGellary(item)}
          cover={<img src={'/gallery/' + item} alt="" />}
        >
          <Card.Meta title="react admin" description="I love look" />
        </Card>
      ))
    );

    return (
      <div className="card-wrap">
        <Row gutter={10}>
          <Col md={5}>{imgList[0]}</Col>
          <Col md={5}>{imgList[1]}</Col>
          <Col md={5}>{imgList[2]}</Col>
          <Col md={5}>{imgList[3]}</Col>
          <Col md={4}>{imgList[4]}</Col>
        </Row>
        <Modal
          title="选择的图片"
          width={300}
          height={500}
          visible={this.state.visibale}
          onCancel={() => {
            this.setState({
              visibale: false
            });
          }}
          footer={null}
        >
          <img
            src={this.state.currentImg}
            style={{ width: 100 + '%' }}
            alt=""
          />
        </Modal>
      </div>
    );
  }
}
