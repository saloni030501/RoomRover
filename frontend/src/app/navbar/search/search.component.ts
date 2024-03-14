
// import { Component } from '@angular/core';
// import { SearchService } from '../../search.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent {

//   city: string = '';
//   area: string = '';
//   hotelName: string = '';
//   searchResults: any[] = [];

//   constructor(private searchService: SearchService) {}

//   search() {
//     this.searchService.searchHotels(this.city, this.area, this.hotelName)
//       .subscribe((results: any[]) => {
//         this.searchResults = results;
//       });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  hotels: any[] = []; // Define an array to hold hotel data
  filteredHotels: any[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    // Fetch hotels data when component initializes
    this.fetchHotels();
  }

  // Method to fetch hotels data from the service
  fetchHotels(): void {
    this.servicesService.getHotels().subscribe(data => {
      this.hotels = data; // Assign fetched data to hotels array
    });
  }

  search() {
    if (!this.searchText) {
      this.filteredHotels = []; // Reset filtered hotels if search text is empty
      return;
    }
    // Filter hotels based on search text
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.city.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.area.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectHotel(hotel: any) {
    // Handle hotel selection, e.g., navigate to booking page
    console.log('Selected hotel:', hotel);
  }

  toggleBookingForm(hotel: any) {
    // Toggle booking form visibility
    hotel.showBookingForm = !hotel.showBookingForm;
  }

  confirmBooking(hotel: any) {
    // Handle booking confirmation
    console.log('Confirmed booking for hotel:', hotel);
  }
}

