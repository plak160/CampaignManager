import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Campaign {
  id: string;
  title: string;
  radius: number;
  keyword: string;
  fund: number;
  status: string | null;
  town: string;
  bid: number;
  selectedKeywords: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private storageKey = 'campaigns';
  private campaigns: Campaign[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.campaigns));
  }

  private loadFromStorage() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.campaigns = JSON.parse(storedData);
    }
  }

  getMockCampaigns(): Observable<Campaign[]> {
    return of(this.campaigns);
  }

  addCampaign(campaign: Omit<Campaign, 'id'>) {
    const newCampaign: Campaign = { id: this.generateId(), ...campaign };
    this.campaigns.push(newCampaign);
    this.saveToStorage();
    console.log('Dodano kampanię:', newCampaign);
  }

  deleteCampaign(id: string) {
    this.campaigns = this.campaigns.filter(campaign => campaign.id !== id);
    this.saveToStorage();
    console.log(`Usunięto kampanię: ${id}`);
  }

  editCampaign(updatedCampaign: Campaign) {
    const index = this.campaigns.findIndex(campaign => campaign.id === updatedCampaign.id);
    if (index !== -1) {
      this.campaigns[index] = updatedCampaign;
      this.saveToStorage();
      console.log('Zaktualizowano kampanię:', updatedCampaign);
    }
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Unikalne ID
  }
}
