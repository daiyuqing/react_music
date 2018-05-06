import React, { Component } from 'react';
import right_arrow  from '../.././static/images/right_arrow.png';


class Recommend extends Component{
    constructor(){
        super();
        this.state={
            banner:[],
            new_song:[],
            plist:[]
        }
    }
    componentWillMount(){
        try{

            fetch('/kugou/?json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                        banner:result.banner,
                        new_song:result.data
                    });
                },(error)=>{
                    console.log(error);
                }
            );
            fetch('/kugou/plist/index&json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                        plist:result.plist.list.info
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
    render() {
        return (
            <div style={{width:'10rem'}}>
                <img src='http://imge.kugou.com/mobilebanner/20180504/20180504194725336580.jpg' style={{height:'4rem',width:'10rem',display:'block'}}/>
                <div style={{width:'9.5rem',height:'1.2rem',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'0.02rem solid #cccccc',margin:'0 0.25rem',boxSizing:'border-box'}}>
                    <span style={{color:'#666666',fontSize:'0.4rem'}}>推荐歌单</span>
                    <img src={right_arrow} style={{height:'0.4rem',width:'0.4rem'}}/>
                </div>
                <div style={{width:'10rem',display:'flex',flexWrap:'wrap'}}>
                    {this.state.plist.map((item,index)=>{
                        if (index>8) {return}
                        let url=item.imgurl.replace('/{size}','');
                        return (<div key={item.specialid} style={{width:'3rem',marginLeft:'0.25rem',marginTop:'0.25rem'}}>
                            <img src={url} style={{height:'3rem',width:'3rem'}}/>
                            <p style={{color:'#666666',fontSize:'0.3rem'}}>{item.specialname}</p>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
const styles={

}
export default Recommend;