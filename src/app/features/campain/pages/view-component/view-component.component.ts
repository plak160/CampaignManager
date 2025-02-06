import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../../../../../mock/mock-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css'],
  standalone: true
})
export class ViewComponentComponent implements OnInit {
  campaigns: any[] = [];
  editingCampaign: any | null = null;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.mockDataService.getMockCampaigns().subscribe(data => {
      this.campaigns = data;
    });
  }

  editCampaign(campaign: any) {
    this.editingCampaign = { ...campaign }; 
  }

  saveEditedCampaign() {
    if (this.editingCampaign) {
      this.mockDataService.editCampaign(this.editingCampaign);
      this.editingCampaign = null;
      this.loadCampaigns(); 
    }
  }

  cancelEdit() {
    this.editingCampaign = null;
  }

  deleteCampaign(id: string) {
    this.mockDataService.deleteCampaign(id);
    this.loadCampaigns();
  }
}
