import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import right_arrow  from '../.././static/images/right_arrow.png';
class Rank extends Component{
	constructor(){
        super();
        this.state={
            rankData:[]
        }
    }
    componentWillMount(){
        try{
            fetch('/kugou/rank/list&json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                        rankData:result.rank.list
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
	render(){
		let list=this.props.list;
		return(<div>
				<Header/>
				<Nav page='rank'/>
				<div style={{width:'10rem',padding:'0 0.3rem'}}>
					{this.state.rankData.map((item,index)=>{
						let url=item.imgurl.replace('/{size}','');
						return (<div key={item.rankid} style={{display:'flex',alignItems:'center',height:'3rem',width:'9.4rem',borderBottom:'0.02rem solid #ccc'}}>
							<img src={url} alt="" style={{width:'2.5rem',height:'2.5rem'}}/>
							<p style={{fontSize:'0.4rem',marginLeft:'0.3rem',width:'6rem'}}>{item.rankname}</p>
							<img src={right_arrow} alt="" style={{width:'0.5rem',height:'0.5rem'}}/>
						</div>)
					})}
				</div>
			</div>)
	}
}


export default connect(
  (state)=>state.Rank,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Rank);