
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Nav extends Component{
	render(){
		return(<ul style={styles.nav}>
            	<Link to='/'>
	            	<ol style={this.props.page=='home'?styles.nav_item_active:styles.nav_item_inactive}>
	            		个性推荐
	            	</ol>
            	</Link>
            	<Link to='/new'>
	            	<ol style={this.props.page=='new'?styles.nav_item_active:styles.nav_item_inactive}>
	            		新歌
	            	</ol>
            	</Link>
            	<Link to='/rank'>
	            	<ol style={this.props.page=='rank'?styles.nav_item_active:styles.nav_item_inactive}>
	            		排行榜
	            	</ol>
            	</Link>
            	<Link to='/artist'>
	            	<ol style={this.props.page=='artist'?styles.nav_item_active:styles.nav_item_inactive}>
	            		歌手
	            	</ol>
            	</Link>
            </ul>
        )
	}
}
const styles={
	nav:{
		display:'flex',
		width:'10rem',
		height:'1.2rem',
		justifyContent:'space-around',
		alignItems:'center',
		boxSizing:'border-box'
	},
	nav_item_inactive:{
		width:'1.8rem',
		height:'1.1rem',
		lineHeight:'1.1rem',
		fontSize:'0.4rem',
		textAlign:'center',
		color:'#333333',
		padding:'0 0.2rem'
	},
	nav_item_active:{
		width:'1.8rem',
		height:'1.1rem',
		lineHeight:'1.1rem',
		fontSize:'0.4rem',
		textAlign:'center',
		color:'#e9203d',
		borderBottom:'0.05rem solid #e9203d',
		padding:'0 0.2rem'
	}
}

export default Nav;