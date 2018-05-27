import React, {Component} from 'react';
import * as actions from '../.././actions/artist.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import right_arrow  from '../.././static/images/right_arrow.png';
import Loading from '../.././components/common/Loading.js';
import {IsEmpty} from '../.././util/tools.js';
import {Link} from 'react-router-dom';
class Artist extends Component{
	constructor(){
        super();
        this.state={
           
        }
    }
    componentWillMount(){
        try{
            fetch('/kugou/singer/class&json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.props.actions.update_singer_class(result.list);
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
	render(){
		let content=null;
        if (IsEmpty(this.props.singerClass)) {
            content=(<Loading/>) ;
        }else{
            content=(<div style={{width:'10rem',padding:'0.3rem'}}>
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
		return(<div>
				<Header/>
				<Nav page='artist'/>
				{content}
			</div>)
	}
}
export default Artist;