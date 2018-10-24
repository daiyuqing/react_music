
/**
   登录页
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import {IsEmpty} from 'util/tools.js';
class Login extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }
    componentDidMount(){
        let username= localStorage.getItem('username');
        let password= localStorage.getItem('password');
        if (!IsEmpty(username)&&!IsEmpty(password)) {
            let name=document.getElementsByClassName('username')[0];
            let word=document.getElementsByClassName('password')[0];
            name.value=username;
            word.value=password;
        }
    }
    clearUsername(){
        let name=document.getElementsByClassName('username')[0];
        name.value='';
    }
    clearPassword(){
        let word=document.getElementsByClassName('password')[0];
        word.value='';
    }
    login(){
        let name=document.getElementsByClassName('username')[0];
        let word=document.getElementsByClassName('password')[0];
        let username=name.value;
        let password= word.value;
        if (username=='') {
            alert('您还未输入用户名！');
            return;
        }
        if (password=='') {
            alert('您还未输入密码！');
            return;
        }
        localStorage.setItem('username',username);
        localStorage.setItem('password',password);
        location.href='#/user/center';
    }
    render() {
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.8rem'}}>登陆</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'4rem'}}>
                    <i className="iconfont icon-music" style={{fontSize:'3rem',color:'#e9203d'}}></i>
                    <div style={{display:'flex',alignItems:'center',width:'8.5rem',height:'1.2rem',borderRadius:'1.6rem',marginTop:'0.6rem',border:'0.03rem solid #ccc'}}>
                        <i className="iconfont icon-username" style={{fontSize:'0.8rem',color:'#888',marginLeft:'0.3rem'}}></i>
                        <input className='username' type="text" placeholder='请输入用户名' style={{fontSize:'0.5rem',width:'6rem',border:'none',marginLeft:'0.3rem'}}/>
                        <i onClick={this.clearUsername.bind(this)} className="iconfont icon-close" style={{fontSize:'0.3rem',color:'#888',marginLeft:'0.3rem'}}></i>
                    </div>
                    <div style={{display:'flex',alignItems:'center',width:'8.5rem',height:'1.2rem',borderRadius:'1.6rem',marginTop:'0.6rem',border:'0.03rem solid #ccc'}}>
                        <i className="iconfont icon-password" style={{fontSize:'0.8rem',color:'#888',marginLeft:'0.3rem'}}></i>
                        <input className='password' type="password" placeholder='请输入密码' style={{fontSize:'0.5rem',width:'6rem',border:'none',marginLeft:'0.3rem'}}/>
                        <i onClick={this.clearPassword.bind(this)} className="iconfont icon-close" style={{fontSize:'0.3rem',color:'#888',marginLeft:'0.3rem'}}></i>
                    </div>
                    <div onClick={this.login.bind(this)} style={{width:'8.5rem',height:'1.2rem',borderRadius:'1.6rem',marginTop:'0.6rem',backgroundColor:'#e9203d',}}>
                        <p style={{textAlign:'center',fontSize:'0.5rem',color:'#fff',height:'1.2rem',lineHeight:'1.2rem'}}>登陆</p>   
                    </div>
                </div>
            </div>
        );
    }
}
const styles={
    
}

export default Login;