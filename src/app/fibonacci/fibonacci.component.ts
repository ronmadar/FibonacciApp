import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent implements OnInit {
  page!: number;
  fibonacciNumber!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.page = +params['page'];
      this.fibonacciNumber = this.getFibonacciNumber(this.page);
    });

    window.onpopstate = () => {
      const page = this.route.snapshot.paramMap.get('page');
      this.page = page ? +page : 1; // Fallback to 1 if page is null
      this.fibonacciNumber = this.getFibonacciNumber(this.page);
    };

    const lastVisited = localStorage.getItem('lastVisited');
    if (lastVisited) {
      this.router.navigate(['/fibonacci', lastVisited]);
    }
  }

  getFibonacciNumber(n: number): number {
    if (n <= 1) return 1;
    let a = 1, b = 1;
    for (let i = 2; i < n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }

  goToPage(page: number): void {
    this.router.navigate(['/fibonacci', page]);
    localStorage.setItem('lastVisited', page.toString());
  }
}
