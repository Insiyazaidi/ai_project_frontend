export const BASE_URL = "http://localhost:8000"
export const API_PATHS = {
    AUTH:{
        REGISTER :"/api/user/register",
        LOGIN:"api/user/login",
        GET_PROFILE:"api/user/profile",  // yeh get req 
        UPDATE_PROFILE:"api/user/profile" , // post req h
        CHANGE_PASSWORD:"api/user/change-password"

    } ,
    DOCUMENTS:{
        UPLOAD:"/api/documents/upload",
        GET_DOCUMENTS:"/api/documents",
        GET_DOCUMENTS_BY_ID:(id)=>`/api/documents/${id}`,
        UPDATE_DOCUMENT:(id)=>`/api/documents/${id}`,
        DELETE_DOCUMENT:(id)=>`api/documents/${id}`

    },
    AI:{
        GENERATE_FLASHCARDS:"/api/airoute/generate-flashcards",
        GENERATE_QUIZ:"/api/airoute/generate-quiz",
        GENERATE_SUMMARY:"/api/airoute/generate-summary",
        CHAT:"/api/airoute/chat",
        EXPLAIN_CONECPT:"/api/airoute/explain-concept",
        GET_CHAT_HISTORY:(documentid)=>`/api/airoute/chat-history/${documentid}`
    },
    FLASHCARDS:{
        GET_ALL_FLASHCARD_SET:"/api/flash",
        GET_FLASHCARDS_FOR_DOC:(documentid)=>`/api/flash/${documentid}`,
        REVIEW_FLASHCARDS: (cardid)=>`/api/flash/${cardid}/review`,
        TOGGLE_STAR:(cardid)=>`/api/flash/${cardid}/star`,
        DELETE_FLASHCARD_SET:(id)=>`/api/flash/${id}`,
    },
    QUIZZES:{
        GET_QUIZZES_FOR_DOC:(documentid)=>`/api/quiz/${documentid}`,
        GET_QUIZ_BY_ID:(id)=>`/api/quiz/specificquiz/${id}`,
        SUBMIT_QUIZ:(id)=>`/api/quiz/${id}/submit`,
        GET_QUIZ_RESULTS:(id)=>`/api/quiz/${id}/results`,
        DELETE_QUIZ:(id)=>`/api/quiz/${id}`,
    },
    PROGRESS:{
        GET_DASHBOARD:"api/progress/dashboard"
    }
}