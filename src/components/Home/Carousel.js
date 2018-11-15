import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
class Carousel extends Component{
     render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <div>
                <Slider {...settings}>
                    {
                      this.props.banner.map((item, index) => {
                        return (
                            <div key={index}>
                                <img src={item.imgurl} style={{width:'10rem'}} alt=""/>
                            </div>
                        )
                      })
                    }
                </Slider>
            </div>
        )
    }
}
export default Carousel;
