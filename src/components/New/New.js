import React, {Component} from 'react';
import * as actions from 'actions/music.js';
import Loading from 'components/common/Loading.js';
import {IsEmpty} from 'util/tools.js';
import { Layout } from 'element-react';
class New extends Component{
	constructor(){
        super();
        this.state={
            collection:''
        }
    }
    componentWillMount(){
        let collection=localStorage.getItem('collection');
        if (collection) {
            this.setState({
                collection:collection
            });
        }
    }
    collect(hash,filename,i){
        let collection=localStorage.getItem('collection');
        if (collection) {
            let newCollection=collection.split(',');
            if (collection.indexOf(hash)>-1) {
                let index=newCollection.indexOf(hash+'|'+filename);
                newCollection.splice(index,1);
            }else{
                newCollection.push(hash+'|'+filename);
            }
            localStorage.setItem('collection',newCollection.join(','));
            this.setState({
                collection:newCollection.join(',')
            });
        }else{
            localStorage.setItem('collection',hash+'|'+filename);
            this.setState({
                collection:hash+'|'+filename
            });
        }
    }
    play(item){
        let play_list=this.props.play_list;
        play_list.push(item);
        this.props.actions.add_song(play_list);
        this.props.actions.music_get_hash(item.hash);
        this.props.actions.music_control(true);
        this.props.history.push('/play/'+item.hash);
    }
	render(){
        if (IsEmpty(this.props.new_song)) {
            return <Loading/>
        }else{
            return(<div style={{width:'10rem',padding:'0 0.25rem'}}>
                    {this.props.new_song.map((item,index)=>{
                        let color='#ccc';
                        if (this.state.collection.indexOf(item.hash)>-1) {
                            color='#e9203d';
                        }
                        return( <div onClick={this.play.bind(this,item)}  key={item.audio_id}>
                            <Layout.Row type="flex"  align="middle"  style={{height:'1.2rem',borderBottom:'0.01rem solid #cccccc'}}>
                                <Layout.Col span="22">
                                    <p style={{color:'#333',fontSize:'0.4rem',width:'8rem',lineHeight:'0.5rem'}}>{item.filename}</p>
                                </Layout.Col>
                                <Layout.Col span="2">
                                    <i onClick={this.collect.bind(this,item.hash,item.filename,index)} className="iconfont icon-heart" style={{fontSize:'0.5rem',color:color}}></i>
                                </Layout.Col>
                          </Layout.Row>
                        </div>) 
                    })}
                </div>);
        }
	}
}


export default New;