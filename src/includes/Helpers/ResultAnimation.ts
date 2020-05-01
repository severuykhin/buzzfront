import Fire from '../../resources/001-fire'
import Clap from '../../resources/002-clapping'
import Sad3 from '../../resources/003-emoji'
import Hands from '../../resources/004-hands'
import Sad from '../../resources/005-sad'
import Sad1 from '../../resources/006-sad-1'
import Sad2 from '../../resources/007-sad-2'
import Smile from '../../resources/008-smile'
import Like from '../../resources/009-like'
import Flirt from '../../resources/010-flirt'

const data = {
    success: [Fire, Clap, Like, Smile, Flirt],
    fail: [Sad, Sad1, Sad2, Sad3, Hands],
};

export default (type: string, score: number) => {

    const heroElem = document.querySelector('.word-inner');
    const snackElem = document.createElement('div');
    const emojiGroup = data[type];
    const emoji = emojiGroup[Math.floor(Math.random() * emojiGroup.length)];
    const scoreElem = document.createElement('div');

    scoreElem.innerHTML = `+${score}`;
    snackElem.innerHTML = emoji;

    snackElem.classList.add('result--icon');
    snackElem.classList.add('result--icon--reveal');
    scoreElem.classList.add('result--icon');
    scoreElem.classList.add('result--icon--reveal');
    scoreElem.classList.add('result--icon--score');
    heroElem.appendChild(snackElem);

    if (type === 'success') {
        heroElem.appendChild(scoreElem);
    }

    setTimeout(() => {
        heroElem.removeChild(snackElem);
    }, 1500);

}