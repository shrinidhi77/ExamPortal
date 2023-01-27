import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: '',
    },
  };

  constructor(private categoryService: CategoryService, private snackbar: MatSnackBar, private quizService: QuizService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        // category are loaded
        this.categories = data;
        // console.log(this.categories);
      }, (error) => {
        // if error in category
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data from the server', 'error');
      }

    )
  }

  // add quiz  function 
  public addNewQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snackbar.open("Enter Title Details !!", '', {
        duration: 3000,
      }); return;
    }

    if (this.quizData.category.cid == '' || this.quizData.category.cid == null) {
      this.snackbar.open("Please Select Category from drop down !!", '', {
        duration: 3000,
      }); return;
    }
    // console.log(this.quizData);

    // call the server to add new quiz
    this.quizService.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire("Success !!", 'QuizData is added successfuly', 'success');

        this.quizData = {
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
        Swal.fire("Error !!", 'Server error !!', 'error');
      }
    );
  }

}
