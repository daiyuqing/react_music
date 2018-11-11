import React, { Component } from 'react';
import { Carousel } from 'element-react';
class Carousels extends Component{
     render() {
        return (
            <div>
                <Carousel>
                    {
                      this.props.banner.map((item, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <img src={item.imgurl} style={{width:'10rem',height:'4rem'}} alt=""/>
                            </Carousel.Item>
                        )
                      })
                    }
                </Carousel>
            </div>
        )
    }
}
export default Carousels;
