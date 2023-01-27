import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private questionService: QuestionService) { }

  // quiz ID
  qId: any;

  // quiz Title
  qTitle: any;

  questions: any = [];

  

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this.questionService.getQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;

        console.log(this.questions);

      }, (error) => {
        console.log(error);
        Swal.fire('Error !', "Error in loading data", 'error');
      }
    )
  }



  // delete quiz
  public deleteQuestion(quesId: any) {

    // alert(quesId);
    Swal.fire({
      icon: 'info',
      title: "Are you sure you want to delete this question?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        // confirm delete...
        this.questionService.deleteQuestion(quesId).subscribe(
          (data: any) => {
            this.questions = this.questions.filter((questions: any) => questions.quesId != quesId);
            Swal.fire('Success !', "Question deleted successfully", 'success');
          },
          (error:any) => {
            console.log(error);
            Swal.fire("Error !!", "Error in deleting question", 'error');
          }
        )

      }
    })

  }

}
