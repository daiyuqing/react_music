
/**
   个人中心
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
import {IsEmpty} from '../.././util/tools.js';
import girl from '../.././static/images/girl.jpg';
class Center extends Component{
    constructor(){
        super();
        this.state={
            username:''
        }
    }
    componentWillMount(){
        let username= localStorage.getItem('username');
        if (!IsEmpty(username)) {
            this.setState({
				username:username
            });
        }
    }
    
    render() {
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/login'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.2rem'}}>个人中心</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'2.5rem'}}>
	                <img src={girl} style={{width:'5rem',height:'5rem',borderRadius:'5rem',marginBottom:'0.5rem'}} alt=""/>
	                <p style={{fontSize:'0.4rem',color:'#333'}}>当前用户：{this.state.username}</p>
                    <Link to='/love'><p style={{width:'9rem',height:'1.5rem',lineHeight:'1.5rem',fontSize:'0.4rem',borderBottom:'0.02rem solid #d9d9d9',position:'relative',color:'#333'}}>我的收藏列表<i className="iconfont icon-previewright" style={{fontSize:'0.5rem',color:'#333',marginLeft:'0.2rem',position:'absolute',right:'0rem',top:'0rem'}}></i></p></Link>
                    <p style={{width:'9rem',height:'1.5rem',lineHeight:'1.5rem',fontSize:'0.4rem',borderBottom:'0.02rem solid #d9d9d9',color:'#333'}}>开发者：<a href="https://github.com/daiyuqing">Dale</a></p>
                    <p style={{width:'9rem',height:'1.5rem',lineHeight:'1.5rem',fontSize:'0.4rem',borderBottom:'0.02rem solid #d9d9d9',color:'#333'}}><a href="https://daiyuqing.github.io/">开发者博客</a></p>
                </div>
            </div>
        );
    }
}
const styles={
    
}

export default Center;