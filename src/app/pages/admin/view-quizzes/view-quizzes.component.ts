import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    // add the quiz
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      }, (error) => {
        console.log(error);
        Swal.fire('Error !', "Error in loading data", 'error');
      }
    )

  }

  // delete quiz
  public deleteQuiz(qId: any) {

    Swal.fire({
      icon: 'info',
      title: "Are you sure you want to delete this quiz?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // delete...
        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success !', "Quiz deleted successfully", 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire("Error !!", "Error in deleting data", 'error');
          }
        )
      }
    })
    
  }


}
