import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  // get the quiz detials from DB
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // add new quizzes 
  public addQuiz(quiz: any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //  delete a quiz
  public deleteQuiz(qId: any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  // get the single quiz
  public getQuiz(quizId: any){
    return this._http.get(`${baseUrl}/quiz/${quizId}`);
  }

  // update the quiz
  public updateQuiz(quiz: any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  // get quizzes based on category
  public getQuizesByCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }


  // USER API's
  // get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  // get active quizzes of category
  public getActiveQuizzesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  
}
