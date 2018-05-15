

/**
专辑列表组件
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import back  from '../.././static/images/back.png';
import music  from '../.././static/images/music.png';
import * as actions from '../.././actions/music.js';
class AlbumList extends Component{
    constructor(){
        super();
    }
   
    render() {
        console.log(this.props)
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/'>
                        <i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i>
                    </Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>精选歌单</span>
                </div>
                <div style={{width:'10rem',display:'flex',flexWrap:'wrap',paddingBottom:'0.5rem'}}>
                    {this.props.plist.map((item,index)=>{
                        let url=item.imgurl.replace('/{size}','');
                        let count=item.playcount/10000 ;
                        return (<div key={item.specialid} style={{width:'3rem',marginLeft:'0.25rem',marginTop:'0.25rem',position:'relative'}}>
                            <Link to={'/album/'+item.specialid}>
                                <img src={url} style={{height:'3rem',width:'3rem'}}/>
                                <p style={{color:'#666666',fontSize:'0.3rem'}}>{item.specialname}</p>
                                <div style={{color:'#fff',fontSize:'0.3rem',position:'absolute',top:'0.1rem',right:'0.1rem',alignItems:'center',display:'flex'}}>
                                    <i className="iconfont icon-listen" style={{fontSize:'0.3rem'}}></i>
                                    <p style={{color:'#fff',fontSize:'0.3rem',marginLeft:'0.1rem'}}>{count.toFixed(2)}万</p>
                                </div>
                            </Link>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
const styles={
    
}

export default connect(
    (state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(AlbumList);