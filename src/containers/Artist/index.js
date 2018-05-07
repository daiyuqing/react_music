import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/artist.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import right_arrow  from '../.././static/images/right_arrow.png';
class Artist extends Component{
	constructor(){
        super();
        this.state={
            singerClass:[]
        }
    }
    componentWillMount(){
        try{
            fetch('/kugou/singer/class&json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                        singerClass:result.list
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
				<Nav page='artist'/>
				<div style={{width:'10rem',padding:'0.3rem'}}>
					{this.state.singerClass.map((item,index)=>{
						let marginBottom;
						if (index%3==0) {
							marginBottom='0.3rem';
						}else{
							marginBottom='-0.01rem';
						}
						return (<div key={item.classid} style={{display:'flex',alignItems:'center',height:'1.4rem',width:'9.4rem',border:'0.01rem solid #ccc',marginBottom:marginBottom}}>
							<p style={{fontSize:'0.4rem',marginLeft:'0.3rem',width:'8.5rem'}}>{item.classname}</p>
							<img src={right_arrow} alt="" style={{width:'0.3rem',height:'0.3rem'}}/>
						</div>)
					})}
				</div>
			</div>)
	}
}


export default connect(
  (state)=>state.Artist,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Artist);