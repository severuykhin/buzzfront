export const getActiveStory = state => {
    if (!state || !state.router.location || !state.router.location.pathname) {
        console.info('WARNING! State has no router or router location!');
        return 'main';
    }

    let story = state.router.location.pathname.substr(1);
    if (!story) return 'main';
    return story;
}