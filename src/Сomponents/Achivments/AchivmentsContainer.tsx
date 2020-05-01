import React from 'react'
import { connect } from 'react-redux'
import Achivments from './Achivments'
import { readItems } from '../../redux/achivments/actions'


class AchivmentsContainer extends React.Component {

    props: {
        errors: string[],
        items: any[],
        isPending: boolean,
        unreadCount: number,
        readItems: Function
    }

    // componentDidMount() {
    //     this.readUnwatchedItemsIfExists();
    // }

    componentDidUpdate() {
        this.readUnwatchedItemsIfExists();
    }

    readUnwatchedItemsIfExists() {
        const { items, readItems, unreadCount } = this.props;
        
        if (unreadCount > 0) {
            readItems && readItems();
        }
    }

    render() {

        const { errors, items, isPending } = this.props;

        return <Achivments 
                    items={items}
                    errors={errors}
                    isPending={isPending}/>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.achivments.errors,
        items: state.achivments.items,
        unreadCount: state.achivments.unreadCount,
        isPending: state.achivments.isPending
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readItems: () => dispatch(readItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AchivmentsContainer);