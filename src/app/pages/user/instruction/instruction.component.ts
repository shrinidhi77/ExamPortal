import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  qid: any;
  quiz: any;

  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid);
    this._quizService.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
      }, (error: any) => {
        Swal.fire("Error !!", "Error in loading data", 'error');
      }
    )
  }

  public startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      // denyButtonText: `Don't`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
