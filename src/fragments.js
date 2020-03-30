export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user{
            username
        }
    }`;

export const USER_FRAGMENT = `
        id
        username
        avatar
    `;

export const FILE_FRAGMENT = `
        id
        url
    `;

export const FILE_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        files
        location
        user
        caption
        likes
        comments
        isLiked
        likeCount
        createdAt
        updatedAt
    }
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
           ${USER_FRAGMENT}
        }
        messages{
            ${MESSAGE_FRAGMENT}
        }
    }
`;
