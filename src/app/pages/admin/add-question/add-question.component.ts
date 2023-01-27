import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  Editor = ClassicEditor as unknown as {
    create: any;
  };

  // quiz ID
  qId:any;

   // quiz title
  qTitle:any;

  question = {
    quiz:{
      qId:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _route:ActivatedRoute,private questionService:QuestionService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this.question.quiz['qId'] = this.qId;

    console.log(this.qId);
    console.log(this.qTitle);

  }


  public formSubmit(){

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
    this.questionService.addQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire("Success !!", 'Question is added successfuly', 'success');

        this.question = {
          quiz:{
            qId:this.qId,
          },
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:'',
        };

      },
      (error) =>{
        console.log(error);
        Swal.fire("Error !!", 'Server error !!', 'error');
      } 
    )

  }


}
