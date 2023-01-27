import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private questionService: QuestionService, private _route: ActivatedRoute,
    private snackbar: MatSnackBar, private _router: Router) { }



      
  Editor = ClassicEditor as unknown as {
    create: any;
  };

  // question ID
  quesId: any;

  question: any = [];

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesid'];
    console.log(this.quesId);

    this.questionService.getQuestion(this.quesId).subscribe(
      (data: any) => {
        this.question = data;
        // console.log(data);
        // console.log(this.question);
      }, (error: any) => {
        Swal.fire("Error !!", 'Error in loading data from the server', 'error');
      }
    );
  }


  public formSubmit() {

    // validation
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.snackbar.open("Enter content details !!", '', {
        duration: 3000,
      }); return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.snackbar.open("Select answer details from drop down!!", '', {
        duration: 3000,
      }); return;
    }

    console.log(this.question);
    this.questionService.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Success !!", 'Question is updated successfuly', 'success').then(
          (e) => {
            this._router.navigate(['/admin/view-questions/' + this.question.quiz.qId + '/' + this.question.quiz.title]);
          });
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", 'Server error !!', 'error');
      }
    )

  }


}
