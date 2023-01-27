import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  categories: any = [];

  constructor(private categoryService: CategoryService,
    private snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    private quizService: QuizService,
    private _router: Router) { }

  qId: any;
  quiz: any;

  // quiz = {
  //   title: '',
  //   description: '',
  //   maxMarks: '',
  //   numberOfQuestions: '',
  //   active: false,
  //   category: {
  //     cid: '',
  //   },
  // };


  ngOnInit(): void {

    // getting the data from the url
    this.qId = this._route.snapshot.params['qId'];

    // getting quiz data from quiz ID
    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
        console.log(this.quiz.title);
      }, (error) => {
        console.log(error);
        Swal.fire("Error !!", 'Error in loading data from the server', 'error');
      }
    );
    // console.log("1");
    // console.log(this.quiz);
    
    // fetching category details
    this.categoryService.categories().subscribe(
      (data: any) => {
        // category are loaded
        this.categories = data;
        console.log(this.categories);
      }, (error) => {
        // if error in category
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data from the server', 'error');
      }

    );
  }

  // update form submit
  public updateForm() {
    // validate the data
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.snackbar.open("Enter Title Details !!", '', {
        duration: 3000,
      }); return;
    }

    if (this.quiz.category.cid == '' || this.quiz.category.cid == null) {
      this.snackbar.open("Please Select Category from drop down !!", '', {
        duration: 3000,
      }); return;
    }
    // console.log(this.quiz);

    // call the server to add new quiz
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("Success !!", 'Quiz updated successfuly', 'success').then(
          (e) => {
            this._router.navigate(['/admin/quizzes']);
          });

        this.quiz = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: false,
          category: {
            cid: '',
          },
        };

      }, (error) => {
        console.log(error);
        Swal.fire("Error !!", 'Error in updating quiz!!', 'error');
      }
    );
  }
}
