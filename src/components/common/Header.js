
import React,{Component} from 'react';

class Header extends Component{
	render(){
		return(<div style={styles.header}>
                <i className="iconfont icon-user-round-circle-o" style={{fontSize:'0.8rem',color:'#fff'}}></i>
                <div style={styles.input_box}>
                	<i className="iconfont icon-search" style={{fontSize:'0.5rem',color:'#aaa',marginLeft:'0.2rem'}}></i>
	                <input placeholder='请输入关键字' style={styles.input}/>
                </div>
                <div style={styles.music}>
                	<span style={styles.one_paused} className='one paused'></span>
                	<span style={styles.two_paused} className='two paused'></span>
                	<span style={styles.three_paused} className='three paused'></span>
                	<span style={styles.four_paused} className='four paused'></span>
                </div>
            </div>)
	}
}
const styles={
	header:{
		display:'flex',
		height:'1.2rem',
		background:'#e9203d',
		width:'10rem',
		alignItems:'center',
		boxSizing:'border-box',
		padding:'0 0.3rem'
	},
	img:{
		width:'0.8rem',
		height:'0.8rem',
	},
	input_box:{
		width:'8rem',
		height:'0.8rem',
		background:'#ffffff',
		borderRadius:'1rem',
		margin:'0 0.3rem',
		display:'flex',
		alignItems:'center',
		boxSizing:'border-box',
	},
	input:{
		width:'5rem',
		height:'0.8rem',
		border:'none',
		fontSize:'0.4rem',
		marginLeft:'0.3rem'
	},
	search_icon:{
		width:'0.5rem',
		height:'0.5rem',
		margin:'0 0.3rem'
	},
	music:{
		width:'0.4rem',
		height:'0.4rem',
		display:'flex',
		justifyContent:'space-between',
		alignItems:'flex-end'
	},
	one_paused:{
		width:'0.1rem',
		height:'0.4rem',
		background:'#fff'
	},
	two_paused:{
		width:'0.025rem',
		height:'0.1rem',
		background:'#fff'
	},
	three_paused:{
		width:'0.075rem',
		height:'0.3rem',
		background:'#fff'
	},
	four_paused:{
		width:'0.05rem',
		height:'0.2rem',
		background:'#fff'
	}
}

export default Header;