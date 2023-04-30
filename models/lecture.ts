export interface LectureModel {
    id?: string;
    classID: string;
    lectureName: string;
    currentUser: string;
    lectureSpeed: { userID: string; value: number }[];
    understanding: { userID: string; value: number }[];
    date: string;
    lectureNumber: number;
    qna: { message: string; email: string; time: string; }[];
}