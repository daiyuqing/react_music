import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import * as actions from 'actions/rank.js';
import Loading from 'components/common/Loading.js';
import {IsEmpty} from 'util/tools.js';
class Rank extends Component{
	constructor(){
        super();
    }
    componentWillMount(){
        try{
            fetch('/kugou/rank/list&json=true').then( (res) => res.json()).then(
                (result)=>{
                    this.props.actions.update_rank(result.rank.list);
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
	render(){
		if (IsEmpty(this.props.rankData)) {
            return(<Loading/>);
        }else{
        	return(<div style={{width:'10rem',padding:'0 0.3rem'}}>
					{this.props.rankData.map((item,index)=>{
						let url=item.imgurl.replace('/{size}','');
						return (<Link key={item.rankid} to={'/rank/list/'+item.rankid}>
                            <div style={{display:'flex',alignItems:'center',height:'3rem',width:'9.4rem',borderBottom:'0.02rem solid #ccc'}}>
							<img src={url} alt="" style={{width:'2.5rem',height:'2.5rem'}}/>
							<p style={{fontSize:'0.4rem',marginLeft:'0.3rem',width:'6rem',color:'#333'}}>{item.rankname}</p>
                            <i className="iconfont icon-previewright" style={{fontSize:'0.6rem',color:'#666666'}}></i>
						</div>
                        </Link>)
					})}
				</div>);
        }
	}
}

export default Rank;