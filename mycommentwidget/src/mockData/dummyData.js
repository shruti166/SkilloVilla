import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const getDummyData = () => {
  return {
    id: uuidv4(),
    name: faker.name.fullName(),
    commentData: faker.lorem.sentence(10),
    profilePic: faker.image.avatar(),
    date: String(new Date()),
    likes: Math.ceil(Math.random() * 10),
    nestedComments: [],
  };
};

export default getDummyData;
