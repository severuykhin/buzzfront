import React from 'react'
import { connect } from 'react-redux'
import Settings from './Settings'

class SettingsContainer extends React.Component {
    render() {
        return <Settings />
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);