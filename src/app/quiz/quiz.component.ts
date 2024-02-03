import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  questions = [
    {
      question: 'Яке місто є столицею Франції?',
      options: ['Лондон', 'Берлін', 'Париж', 'Мадрид'],
      correctAnswer: 'Париж'
    },
    {
      question: 'Яка планета найбільша в нашій сонячній системі?',
      options: ['Земля', 'Сатурн', 'Юпітер', 'Марс'],
      correctAnswer: 'Юпітер'
    },
    ];

  userAnswers: string[] = new Array(this.questions.length).fill('');
  responseTimes: number[] = [];

  score = 0;
  totalTime = 0;
  averageTime = 0;
  maxTime = 0;
  minTime = 0;

  timeLimitEnabled = false;
  timeLimitPerQuestion = 0;
  totalTimeLimit = 0;

  submitQuiz() {
    this.score = 0;
    this.totalTime = this.responseTimes.reduce((total, time) => total + time, 0);
    this.averageTime = this.totalTime / this.responseTimes.length;
    this.maxTime = Math.max(...this.responseTimes);
    this.minTime = Math.min(...this.responseTimes);
    
    if (this.timeLimitEnabled) {
      this.totalTimeLimit = this.timeLimitPerQuestion * this.questions.length;
    }
    
    for (let i = 0; i < this.questions.length; i++) {
      if (this.userAnswers[i] === this.questions[i].correctAnswer) {
        this.score++;
      }
    }
  }

  recordResponseTime(startTime: number) {
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    this.responseTimes.push(responseTime);
  }

  getCurrentTime(): number {
    return new Date().getTime();
  }
}
