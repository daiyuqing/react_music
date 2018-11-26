

/**
歌手列表组件
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import {IsEmpty,getLocalTime} from 'util/tools.js';
import Loading from 'components/common/Loading.js';
import { Layout } from 'element-react';

class ArtistList extends Component{
    constructor(){
        super();
        this.state={
			artistList:{}
        }
    }
   	componentWillMount(){
        try{
            fetch('/kugou/singer/list/'+this.props.match.params.classid+'?json=true').then( (res) => res.json()).then(
                (result)=>{
                    this.setState({
                    	artistList:result
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }

    render() {
		if (IsEmpty(this.state.artistList)) {
			return <Loading/>
		}
		
        return (
            <div style={{width:'10rem'}}>
                <Layout.Row type="flex"  align="middle"  style={{height:'1.2rem',background:'#e9203d'}}>
                    <Layout.Col span="2" offset="1">
                        <Link to='/'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff'}}></i></Link>
                    </Layout.Col>
                    <Layout.Col span="18">
                        <p style={{color:'#fff',fontSize:'0.4rem',textAlign:'center'}}>{this.state.artistList.classname}</p>
                    </Layout.Col>
                </Layout.Row>
                {this.state.artistList.singers.list.info.map((item,index)=>{
                    let imgurl=item.imgurl.replace('{size}',400);
                    return <Link to={'/artist/list/singer/'+item.singerid} key={item.singerid}><div style={{height:'2rem',display:'flex',alignItems:'center',width:'9.6rem',margin:'0 0.2rem',borderBottom:'0.01rem solid #ccc'}}>
                        <img src={imgurl} style={{height:'1.4rem',width:'1.4rem'}} alt=""/>
                        <p style={{marginLeft:'0.4rem',fontSize:'0.4rem',width:'8rem',color:'#333'}}>{item.singername}</p>
                        <i className="iconfont icon-previewright" style={{fontSize:'0.6rem',color:'#666666'}}></i>
                    </div></Link>
                })}
            </div>
        );
    }
}
const styles={
    
}

export default ArtistList;