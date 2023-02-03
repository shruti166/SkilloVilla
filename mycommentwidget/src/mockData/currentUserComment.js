import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import currentUser from "./currentUser.js";

const currentUserComment = () => {
  return {
    id: uuidv4(),
    name: currentUser().name,
    commentData: faker.lorem.sentence(10),
    profilePic: currentUser().profilePic,
    date: String(new Date()),
    likes: Math.ceil(Math.random() * 10),
    nestedComments: [],
  };
};
export default currentUserComment;
