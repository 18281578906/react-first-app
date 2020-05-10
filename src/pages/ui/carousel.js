import React from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';
export default class Carousels extends React.Component {
  render() {
    return (
      <div>
        <Card title="文字背景轮播" className="card-wrap world-carousel">
          <Carousel autoplay effect="fade">
            <div>
              <h3>this is the 1 pag</h3>
            </div>
            <div>
              <h3>this is the 2 pag</h3>
            </div>
            <div>
              <h3>this is the 3 pag</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="card-wrap picture-carousel">
          <Carousel autoplay>
            <div>
              <img src="/gallery/1.png" alt="" />
            </div>
            <div>
              <img src="/gallery/2.png" alt="" />
            </div>
            <div>
              <img src="/gallery/3.png" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
