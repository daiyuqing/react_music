
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import back  from '../.././static/images/back.png';
import music  from '../.././static/images/music.png';

class AlbumList extends Component{
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
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/'><img src={back} style={{height:'0.5rem',width:'0.5rem',marginLeft:'0.3rem'}}/></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>精选歌单</span>
                </div>
                <div style={{width:'10rem',display:'flex',flexWrap:'wrap',paddingBottom:'0.5rem'}}>
                    {this.state.plist.map((item,index)=>{
                        let url=item.imgurl.replace('/{size}','');
                        let count=item.playcount/10000 ;
                        return (<div key={item.specialid} style={{width:'3rem',marginLeft:'0.25rem',marginTop:'0.25rem',position:'relative'}}>
                            <img src={url} style={{height:'3rem',width:'3rem'}}/>
                            <p style={{color:'#666666',fontSize:'0.3rem'}}>{item.specialname}</p>
                            <div style={{color:'#fff',fontSize:'0.3rem',position:'absolute',top:'0.1rem',right:'0.1rem',alignItems:'center',display:'flex'}}>
                                <img src={music} style={{height:'0.3rem',width:'0.3rem'}}/>
                                <p style={{color:'#fff',fontSize:'0.3rem',marginLeft:'0.1rem'}}>{count.toFixed(2)}万</p>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
const styles={
    
}
export default AlbumList;