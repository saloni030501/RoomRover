import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrl: './book-hotel.component.css'
})
export class BookHotelComponent implements OnInit{

  hotels: any[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    // Fetch hotels data when component initializes
    this.fetchHotels();
  }

  // Method to fetch hotels data from the service
  fetchHotels(): void {
    this.servicesService.getHotels().subscribe(data => {
      this.hotels = data; // Assign fetched data to hotels array
      // Generate random ratings for each hotel
      this.hotels.forEach(hotel => {
        hotel.rating = this.generateRandomRating();
      });
    });
  }

  // Method to generate a random rating between 3.0 and 5.0
  generateRandomRating(): number {
    return Math.floor(Math.random() * (5 - 3.0 + 1)) + 3.0;
  }

  getStarArray(rating: number): number[] {
    const starsCount = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return Array.from({ length: starsCount }).map((_, index) => index + 1).concat(halfStar ? [0.5] : []);
  }

  toggleBookingForm(hotel: any) {
    // Toggle booking form visibility
    hotel.showBookingForm = !hotel.showBookingForm;
  }
}
