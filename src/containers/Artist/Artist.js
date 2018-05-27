
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/artist.js';
import Artist from '../.././components/Artist/Artist.js';


export default connect(
  (state)=>state.Artist,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Artist);