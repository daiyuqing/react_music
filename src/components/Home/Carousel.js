import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
class Carousel extends Component{
     render() {
        return (
            <ReactSwipe className="carousel" swipeOptions={{continuous: false,auto: 2000}}>
                {this.props.banner.map((item,index)=>{
                    return <div key={index}>
                        <img src={item.imgurl} style={{width:'10rem',height:'4rem'}} alt=""/>
                    </div>
                })}
            </ReactSwipe>
        );
    }
}
export default Carousel;
