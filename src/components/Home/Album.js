
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import back  from '../.././static/images/back.png';
import music  from '../.././static/images/music.png';
import * as actions from '../.././actions/home.js';
import Loading from '../.././components/common/Loading.js';
class Album extends Component{
    constructor(){
        super();
        this.state={
            data:{}
        }
    }
    componentWillMount(){
        if (this.props.match.params.id) {
            let id=this.props.match.params.id;
            try{
                fetch('/kugou/plist/list/'+id+'?json=true').then( (res) => res.json()).then(
                    (result)=>{
                       console.log(result);
                       this.setState({
                        data:result
                       })
                    },(error)=>{
                        console.log(error);
                    }
                );
            }catch(e){
                
            }
        }else{
            location.href='./home';
            return;
        }
    }
    render() {
        if (!this.state.data.info) {
            return <Loading/>
        }
        let info=this.state.data.info.list;
        let list=this.state.data.list;
        let imgurl=info.imgurl.replace('/{size}','');
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/'><img src={back} style={{height:'0.5rem',width:'0.5rem',marginLeft:'0.3rem'}}/></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>歌单</span>
                </div>
                <div style={{background:'#ccc'}}>
                    <div style={{width:'10rem',display:'flex',height:'4.2rem',alignItems:'center'}}>
                        <img src={imgurl} style={{width:'3.6rem',height:'3.6rem',marginLeft:'0.3rem'}} alt=""/>
                        <div style={{width:'5rem',marginLeft:'0.3rem'}}>
                            <p style={{height:'1.4rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>名称：{info.specialname}</p>
                            <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>创建人：{info.username}</p>
                            <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>更新时间：{info.publishtime.slice(0,10)}</p>
                        </div>
                    </div>
                    <div style={{width:'9.4rem',display:'flex',height:'1rem',alignItems:'center',justifyContent:'space-between',padding:'0 0.3rem'}}>
                        <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#e9203d'}}>播放全部</p>
                        <img src={music} style={{width:'0.6rem',height:'0.6rem',marginLeft:'0.3rem'}} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}
const styles={
    
}

export default connect(
    (state)=>state.Home,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Album);