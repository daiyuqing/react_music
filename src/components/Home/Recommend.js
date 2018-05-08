import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import right_arrow  from '../.././static/images/right_arrow.png';
import music  from '../.././static/images/music.png';
import Loading from '../.././components/common/Loading.js';
class Recommend extends Component{
    render() {
        if (this.props.plist.length==0) {
            return <Loading/>
        }
        return (
            <div style={{width:'10rem'}}>
                <img src='http://imge.kugou.com/mobilebanner/20180504/20180504194725336580.jpg' style={{height:'4rem',width:'10rem',display:'block'}}/>
                <div style={{width:'9.5rem',height:'1.2rem',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'0.02rem solid #cccccc',margin:'0 0.25rem',boxSizing:'border-box'}}>
                    <span style={{color:'#666666',fontSize:'0.4rem'}}>推荐歌单</span>
                    <Link to='/albumList'><img src={right_arrow} style={{height:'0.4rem',width:'0.4rem'}}/></Link>
                </div>
                <div style={{width:'10rem',display:'flex',flexWrap:'wrap'}}>
                    {this.props.plist.map((item,index)=>{
                        if (index>8) {return}
                        let url=item.imgurl.replace('/{size}','');
                        let count=item.playcount/10000 ;
                        return (<div key={item.specialid} style={{width:'3rem',marginLeft:'0.25rem',marginTop:'0.25rem',position:'relative'}}>
                            <img src={url} style={{height:'3rem',width:'3rem'}}/>
                            <p style={{color:'#666666',fontSize:'0.3rem'}}>{item.specialname}</p>
                            <div style={{color:'#fff',fontSize:'0.3rem',position:'absolute',top:'0.1rem',right:'0.1rem',alignItems:'center',display:'flex'}}>
                                <img src={music} style={{height:'0.3rem',width:'0.3rem'}}/>
                                <p style={{color:'#fff',fontSize:'0.3rem',marginLeft:'0.1rem'}}>{count.toFixed(2)}万</p>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
const styles={
    
}
export default Recommend;