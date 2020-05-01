import React from 'react'
import { connect } from 'react-redux'
import Suggest from './Suggest'
import { AllowActionsInterface } from '../../includes/Constants'

class SuggestContainer extends React.Component {

    props: {
        allowActions: AllowActionsInterface
        mainPopout: any
        mainSnackbar: any
    }

    render() {
        return <Suggest
                    mainSnackbar={this.props.mainSnackbar}
                    mainPopout={this.props.mainPopout} 
                    allowActions={this.props.allowActions}/>
    }
}

const mapStateToProps = (state) => ({
    allowActions: {...state.user.allowActions}
});

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestContainer);