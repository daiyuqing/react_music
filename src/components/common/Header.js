
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Layout,Input } from 'element-react';

class Header extends Component{
	render(){
		return (
		    <Layout.Row type="flex"  align="middle"  style={{background:'#e9203d',height:'1.2rem'}}>
			    <Layout.Col span="2" offset="1">
			    	<Link to='/user/login'>
			    		<i className="iconfont icon-user-round-circle-o" style={{fontSize:'1rem',color:'#fff'}}></i>
			    	</Link>
			    </Layout.Col>
			    <Layout.Col span="16">
			    	<Link to='/search'>
	                	<div style={{width:'7rem',borderRadius:'0.8rem',height:'0.8rem',backgroundColor:'#fff',position:'relative',marginLeft:'0.3rem'}}>
		                	<i className="iconfont icon-search" style={{fontSize:'0.5rem',color:'#aaa',position:'absolute',left:'0.3rem',top:'0.15rem'}}></i>
			                <p style={{width:'6rem',height:'0.8rem',lineHeight:'0.8rem',color:'#999',fontSize:'0.4rem',marginLeft:'1rem'}}>请输入关键字</p>
		                </div>
	                </Link>
			    </Layout.Col>
			    <Layout.Col span="2" offset="2">
			    	<Link to='/play/5A9B04E32B1C5CBE4B08E8030474E24F'>
		                <div style={styles.music}>
		                	<span style={styles.one_paused} className={this.props.playing?'one playing':'one paused'}></span>
		                	<span style={styles.two_paused} className={this.props.playing?'two playing':'two paused'}></span>
		                	<span style={styles.three_paused} className={this.props.playing?'three playing':'three paused'}></span>
		                	<span style={styles.four_paused} className={this.props.playing?'four playing':'four paused'}></span>
		                </div>
	                </Link>
			    </Layout.Col>
		    </Layout.Row>
		  )
	}
}
const styles={
	music:{
		width:'0.6rem',
		height:'0.6rem',
		marginLeft:'0.3rem',
		display:'flex',
		justifyContent:'space-between',
		alignItems:'flex-end'
	},
	one_paused:{
        width: '0.08rem',
        background: '#fff',
		height: '0.6rem'
	},
	two_paused:{
        width: '0.08rem',
        background: '#fff',
		height: '0.2rem'
	},
	three_paused:{
        width: '0.08rem',
        background: '#fff',
		height: '0.6rem'
	},
	four_paused:{
        width: '0.08rem',
        background: '#fff',
		height: '0.4rem'
	}
}

export default Header;
