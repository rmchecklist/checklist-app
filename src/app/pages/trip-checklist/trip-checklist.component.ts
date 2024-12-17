import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-trip-checklist',
  imports: [FormsModule, NgIf, NgFor, MatListModule, MatCheckboxModule],
  templateUrl: './trip-checklist.component.html',
  styleUrls: ['./trip-checklist.component.scss'],
})
export class TripChecklistComponent {
  _http = inject(HttpClient);
  step: 'questions' | 'checklist' = 'questions';
  tripType: string = '';
  needsVisa: boolean | null = null;
  activities: string[] = [];
  needsRentalCar: boolean | null = null;
  tripDuration: string = '';

  tripItems: { name: string; completed: boolean }[] = [];

  submitQuestions(): void {
    this.generateChecklist();
    this.step = 'checklist';
  }

  generateChecklist(): void {
    this.tripItems = [];

    if (this.tripType === 'outside-country') {
      this.tripItems.push({ name: 'Passport', completed: false });
      if (this.needsVisa) {
        this.tripItems.push({ name: 'Visa', completed: false });
      }
    }

    if (this.activities.includes('beach')) {
      this.tripItems.push({ name: 'Sunscreen', completed: false });
      this.tripItems.push({ name: 'Swimwear', completed: false });
      this.tripItems.push({ name: 'Beach Towel', completed: false });
    }

    if (this.activities.includes('hiking')) {
      this.tripItems.push({ name: 'Hiking Boots', completed: false });
      this.tripItems.push({ name: 'Backpack', completed: false });
      this.tripItems.push({ name: 'Trail Snacks', completed: false });
    }

    if (this.activities.includes('sightseeing')) {
      this.tripItems.push({ name: 'Camera', completed: false });
      this.tripItems.push({ name: 'Comfortable Shoes', completed: false });
    }

    if (this.needsRentalCar) {
      this.tripItems.push({ name: 'Driver’s License', completed: false });
      this.tripItems.push({
        name: 'Rental Car Booking Confirmation',
        completed: false,
      });
    }

    switch (this.tripDuration) {
      case 'short':
        this.tripItems.push({ name: 'Basic Toiletries', completed: false });
        break;
      case 'medium':
        this.tripItems.push({ name: 'Extra Clothes', completed: false });
        break;
      case 'long':
        this.tripItems.push({ name: 'Laundry Detergent', completed: false });
        break;
    }
  }

  toggleCompletion(index: number): void {
    this.tripItems[index].completed = !this.tripItems[index].completed;
  }

  shareChecklist(): void {
    const checklistText = this.tripItems
      .map((item) => `${item.name}: ${item.completed ? '✅' : '❌'}`)
      .join('\n');

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      checklistText
    )}`;
    window.open(whatsappUrl, '_blank');
  }

  sendToWhatsApp(): void {
    const checklistText = this.tripItems
      .map((item) => `${item.name}: ${item.completed ? '✅' : '❌'}`)
      .join('\n');

    const payload = {
      phoneNumber: '+1234567890',
      message: `Here is your trip checklist:\n\n${checklistText}`,
    };

    this._http
      .post('http://localhost:8080/api/whatsapp/send', payload)
      .subscribe({
        next: () => alert('Checklist sent via WhatsApp!'),
        error: (err) => alert('Failed to send the checklist: ' + err.message),
      });
  }
}
