import React, {Component} from 'react';
import * as actions from 'actions/artist.js';
import Loading from 'components/common/Loading.js';
import {IsEmpty} from 'util/tools.js';
import {Link} from 'react-router-dom';

class Artist extends Component{
	constructor(){
        super();
        this.state={
           
        }
    }
    componentWillMount(){
        this.props.actions.get_singer_class();
    }
	render(){
        if (IsEmpty(this.props.singerClass)) {
            return(<Loading/>) ;
        }else{
            return(<div style={{width:'10rem',padding:'0.3rem'}}>
					{this.props.singerClass.map((item,index)=>{
						let marginBottom;
						if (index%3==0) {
							marginBottom='0.3rem';
						}else{
							marginBottom='-0.01rem';
						}
						return (<Link to={'/artist/list/'+item.classid} key={item.classid}>
							<div style={{display:'flex',alignItems:'center',height:'1.4rem',width:'9.4rem',border:'0.01rem solid #ccc',marginBottom:marginBottom}}>
								<p style={{fontSize:'0.4rem',marginLeft:'0.3rem',width:'8.5rem',color:'#333'}}>{item.classname}</p>
								<i className="iconfont icon-previewright" style={{fontSize:'0.4rem',color:'#666666'}}></i>
							</div>
						</Link>)
					})}
				</div>);
        }
	}
}
export default Artist;