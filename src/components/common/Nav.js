
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Nav extends Component{
	render(){
		return(<ul style={styles.nav}>
            	<ol style={this.props.page=='home'?styles.nav_item_active:styles.nav_item_inactive}>
            		<Link to='/'>个性推荐</Link>
            	</ol>
            	<ol style={this.props.page=='new'?styles.nav_item_active:styles.nav_item_inactive}>
            		<Link to='/new'>新歌</Link>
            	</ol>
            	<ol style={this.props.page=='rank'?styles.nav_item_active:styles.nav_item_inactive}>
            		<Link to='/rank'>排行榜</Link>
            	</ol>
            	<ol style={this.props.page=='artist'?styles.nav_item_active:styles.nav_item_inactive}>
            		<Link to='/artist'>歌手</Link>
            	</ol>
            </ul>
        )
	}
}
const styles={
	nav:{
		display:'flex',
		height:'1.2rem',
		justifyContent:'space-around',
		alignItems:'center',
		boxSizing:'border-box'
	},
	nav_item_inactive:{
		width:'1.6rem',
		height:'1.1rem',
		lineHeight:'1.1rem',
		fontSize:'30px',
		textAlign:'center',
		color:'#333333',
		padding:'0 0.2rem'
	},
	nav_item_active:{
		width:'1.6rem',
		height:'1.1rem',
		lineHeight:'1.1rem',
		fontSize:'30px',
		textAlign:'center',
		color:'#e9203d',
		borderBottom:'0.05rem solid #e9203d',
		padding:'0 0.2rem'
	}
}

export default Nav;