export interface LectureModel {
    id?: string;
    classID: string;
    lectureName: string;
    lectureSpeed: { userID: string; value: number }[];
    understanding: { userID: string; value: number }[];
    date: string;
    lectureNumber: string;
    qna: { message: string; email: string; time: string; }[];
}