import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Loading from 'components/common/Loading.js';
import {IsEmpty} from 'util/tools.js';
import Carousels from 'components/Home/Carousel.js';
class Recommend extends Component{
    render() {
        if (IsEmpty(this.props.plist)) {
            return <Loading/>
        }
        return (
            <div style={{width:'10rem'}}>
                <Carousels banner={this.props.banner}/>
                <div style={{width:'9.5rem',height:'1.2rem',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'0.02rem solid #cccccc',margin:'0 0.25rem',boxSizing:'border-box'}}>
                    <span style={{color:'#666666',fontSize:'0.4rem'}}>推荐歌单</span>
                    <Link to='/albumList'><i className="iconfont icon-previewright" style={{fontSize:'0.5rem',color:'#666666'}}></i></Link>
                </div>
                <div style={{width:'10rem',display:'flex',flexWrap:'wrap'}}>
                    {this.props.plist.map((item,index)=>{
                        if (index>8) {return}
                        let url=item.imgurl.replace('/{size}','');
                        let count=item.playcount/10000 ;
                        let path='/album/'+item.specialid;
                        return (<div key={index} style={{width:'3rem',marginLeft:'0.25rem',marginTop:'0.25rem',position:'relative'}}>
                            <Link to={path}>
                                <img src={url} style={{height:'3rem',width:'3rem'}}/>
                                <p style={{color:'#666666',fontSize:'0.3rem'}}>{item.specialname}</p>
                                <div style={{color:'#fff',fontSize:'0.3rem',position:'absolute',top:'0.1rem',right:'0.1rem',alignItems:'center',display:'flex'}}>
                                    <i className="iconfont icon-listen" style={{fontSize:'0.3rem',color:'#fff'}}></i>
                                    <p style={{color:'#fff',fontSize:'0.3rem',marginLeft:'0.1rem'}}>{count.toFixed(2)}万</p>
                                </div>
                            </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Recommend;