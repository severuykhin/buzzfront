import React from 'react'
import { connect } from 'react-redux'
import Word from './Word'
import { makeAttempt, getData } from '../../redux/word/actions'

class WordContainer extends React.Component {
    render() {
        return <Word {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isPending: state.word.isPending,
    isAllowPlay: state.word.isAllowPlay,
    word: {...state.word.word},
    variants: [...state.word.variants],
    currentVariant: state.word.currentVariant,
    status: state.word.status,
    limitlog: {...state.word.limitLog},
    user: {...state.word.user},
    gameStatus: state.word.gameStatus
});

const mapDispatchToProps = (dispatch) => ({
    makeAttempt: (data) => dispatch(makeAttempt(data)),
    getData: () => dispatch(getData())
})

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);