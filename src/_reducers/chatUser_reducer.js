const initialState = {
    data: {},
    chatUserName: "",
    chatUserId: ""
};

function chatUser (state = initialState, action) {
    switch (action.type) {
        case "SET":
            return { ...state, 
                chatUserName: action.chatUserName, 
                chatRoomId: action.chatUserId,
            };

        default:
            return state;
    }
}

export default chatUser;