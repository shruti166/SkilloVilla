import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const getFakeComment = () => {
    return {
        id: uuidv4(),
        commentContent: faker.lorem.sentences(Math.ceil(Math.random())),
        username: faker.name.fullName(),
        profilePic: faker.internet.avatar(),
        commentDateTime: faker.date.recent(),
        likes: Math.ceil(Math.random()*10),
        likedBy: [],
        subComments: []
    };
}

export default getFakeComment;