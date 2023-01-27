
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(router: Router, private _route: ActivatedRoute, private _questionService: QuestionService) { }

  private unsubscriber: Subject<void> = new Subject<void>();
  // refer   https://blog.aakashgoplani.in/disabling-browser-back-navigation-in-angular


  qid: any;
  questions: any;

  marksGot: any = 0;
  correctAnswers: any = 0;
  attempted: any = 0;

  isSubmitted: boolean = false;

  timer: any;

  ngOnInit(): void {
    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
      Swal.fire("Info !!", "Cannot move out of context until quiz gets completed", 'info');
    });

    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion(this.qid);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  loadQuestion(qid: any) {
    this._questionService.getQuestionOfQuizUser(qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        // this.questions.forEach((q: any) => {
        //   q['answer'] = '';
        // });

        this.startTimer();
        console.log(this.questions);

      }, (error: any) => {
        Swal.fire("Error !!", "Error in loading data", 'error');
      }
    )
  }

  printPage(){
    window.print();
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      // denyButtonText: `Don't save`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evalQuiz();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  evalQuiz() {
    
    // // calculation from client side
    // // console.log(this.questions);
    // this.isSubmitted = true;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log("Correct answer" + this.correctAnswers);
    // console.log("Marks got" + this.marksGot);
    // console.log("attempted" + this.attempted);


    // calculation from server side
    // make a call to server to check the answer
    this._questionService.evalQuiz(this.questions).subscribe(
      (data:any) => {
        console.log(data);
        this.marksGot = Number(data['marksGot']).toFixed(2);
        this.correctAnswers = data['correctAnswers'];
        this.attempted = data['attempted'];
        
      },(error:any) =>{
        console.log(error);
        Swal.fire("Error !!", "Issue with server", 'error');
      }
    )
    this.isSubmitted = true;
  }

  startTimer() {
    let t = window.setInterval(() => {
      // code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

}
