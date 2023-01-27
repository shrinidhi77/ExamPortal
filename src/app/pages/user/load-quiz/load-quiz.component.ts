import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;

  constructor(private _route: ActivatedRoute, private _quizService: QuizService) { }

  ngOnInit(): void {

    this.catId = this._route.snapshot.params['catId'];

    this._route.params.subscribe((params: any) => {
      this.catId = params['catId'];

      if (this.catId == 0) {
        console.log("load all the quiz");

        this._quizService.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
          }, (error: any) => {
            console.log(error);
            Swal.fire("Error !!", "Error in loading data", 'error');
          }
        )

      } else {
        console.log("load specific quiz");
        this._quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
          }, (error: any) =>{
            Swal.fire("Error !!", "Error in loading data", 'error');
          }
        )
      }

    })



  }



}
