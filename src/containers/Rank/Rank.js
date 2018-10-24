
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/rank.js';
import Rank from 'components/Rank/Rank.js';



export default connect(
    (state)=>state.Rank,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Rank);