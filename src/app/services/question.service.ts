import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // get all the question available for admin
  public getQuestionOfQuiz(qId: any) {
    return this.http.get(`${baseUrl}/question/quiz/all/${qId}`)
  }

  // get all the question available for user
  public getQuestionOfQuizUser(qId: any) {
    return this.http.get(`${baseUrl}/question/quiz/${qId}`)
  }


  // get the respective question
  public getQuestion(quesId: any) {
    console.log("hit");
    return this.http.get(`${baseUrl}/question/${quesId}`)
  }

  // add the question
  public addQuestion(question: any) {
    return this.http.post(`${baseUrl}/question/`, question)
  }

  // update the question
  public updateQuestion(question: any) {
    return this.http.put(`${baseUrl}/question/`, question)
  }

  // delete the question
  public deleteQuestion(quesId: any) {
    return this.http.delete(`${baseUrl}/question/${quesId}`)
  }

  // eval quiz
  public evalQuiz(questions: any) {
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }



}
