import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    firstName: 'Tanay',
    lastName: 'Pratap',
    avatarURL:
      'https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_400x400.jpg',
    content: `Be the person who puts other first. But also have people who will put you first. Balance is important.`,
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'tanaypratap',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        avatarURL:
          'https://pbs.twimg.com/media/FJ9PSppagAMgXRa?format=jpg&name=large',
        username: 'tanviprya',
        firstName: 'Tanvi',
        lastName: 'Priya',
        text: 'Interesting',
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        avatarURL:
          'https://pbs.twimg.com/profile_images/1481869646018265088/SgTPHx3S_400x400.jpg',
        username: 'sohamshah',
        firstName: 'Soham',
        lastName: 'Shah',
        text: 'Wow!',
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    firstName: 'Akanksha',
    lastName: 'Choudhary',
    avatarURL:
      'https://pbs.twimg.com/profile_images/1085823173419880448/oDNqP1T3_400x400.jpg',
    content: `Don't hate errors and bugs. They're not your enemies. It's a part of your programming journey. See errors and bugs as a sign that you're pushing your boundaries. It shows growth.`,
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'ch_akanksha',

    comments: [
      {
        _id: uuid(),
        avatarURL:
          'https://pbs.twimg.com/media/FJ9PSppagAMgXRa?format=jpg&name=large',
        username: 'tanviprya',
        firstName: 'Tanvi',
        lastName: 'Priya',
        text: 'Interesting',
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        avatarURL:
          'https://pbs.twimg.com/profile_images/1481869646018265088/SgTPHx3S_400x400.jpg',
        username: 'sohamshah',
        firstName: 'Soham',
        lastName: 'Shah',
        text: 'Wow!',
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
