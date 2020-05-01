import { HistoryItem } from '../../includes/Constants'

export function getUnreadLog(state): number {
    return state.history.unread
}