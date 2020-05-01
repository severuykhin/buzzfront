import React from 'react'
import { connect } from 'react-redux'
import History from './History'
import { HistoryItem } from '../../includes/Constants'
import { getSearch, getData, readItems } from '../../redux/history/actions'

class HistoryContainer extends React.Component {

    props: {
        data: HistoryItem[],
        isPending: boolean,
        totalCount: number,
        handleGetData: Function,
        handleGetSearch: Function,
        readHistoryItems: Function
    }

    componentDidMount() {
        this.readUnreadItemsIfExists();
    }

    componentDidUpdate() {
        this.readUnreadItemsIfExists(); 
    }

    readUnreadItemsIfExists() {
        const { readHistoryItems, data } = this.props;

        const unreadItems = data.filter((i: HistoryItem) => i.wached === 0);

        if (unreadItems.length > 0) {
            readHistoryItems(unreadItems.map(i => i.id));
        }
    }

    render() {

        const { data, isPending, totalCount, handleGetData, handleGetSearch } = this.props;

        return <History 
                    data={data}
                    getData={handleGetData}
                    handleSearch={handleGetSearch}
                    totalCount={totalCount} 
                    isPending={isPending} />
    }
}

const mapStateToProps = (state) => ({
    data: [...state.history.data],
    isPending: state.history.isPending,
    totalCount: state.history.totalCount
});

const mapDispatchToProps = (dispatch) => ({
    handleGetSearch: (query) => dispatch(getSearch(query)),
    handleGetData: () => dispatch(getData()),
    readHistoryItems: (ids) => {dispatch(readItems(ids))}
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);