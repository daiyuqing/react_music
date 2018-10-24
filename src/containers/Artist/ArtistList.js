
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/artist.js';
import ArtistList from 'components/Artist/ArtistList.js';


export default connect(
  (state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(ArtistList);