import React from 'react'
import { connect } from 'react-redux'
import Leaders from './Leaders'

class LeadersContainer extends React.Component {

    render() {

        const { data, errors, isPending, currentUser, statuses, maxAvailableCount } = this.props;

        return <Leaders  
                data={data}
                currentUser={currentUser}
                errors={errors}
                statuses={statuses}
                maxAvailableCount={maxAvailableCount}
                isPending={isPending}/>
    }
}

const mapStateToProps = (state) => {
    return {
        data: [...state.leaders.data],
        currentUser: state.leaders.currentUser,
        maxAvailableCount: parseInt(state.leaders.maxAvailableCount, 10),
        statuses: state.leaders.statuses,
        errors: state.leaders.errors,
        isPending: state.leaders.isPending
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LeadersContainer);