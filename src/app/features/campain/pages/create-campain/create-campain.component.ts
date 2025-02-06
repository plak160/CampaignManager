import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../../../mock/mock-data.service';



@Component({
  selector: 'app-create-campain',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './create-campain.component.html',
  styleUrl: './create-campain.component.css'
})

export class CreateCampainComponent implements OnInit {
  constructor(private mockDataService: MockDataService) {}

  createCampaignForm = new FormGroup({
    titleControl: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
      }),

    radiusControl: new FormControl<number>(0,
      {
      nonNullable:true, 
      validators: [Validators.required, Validators.min(5)]
      }),

    keywordControl: new FormControl<string>('',
      {
        nonNullable:true, 
      }),

    fundControl: new FormControl<number>(0,
      {
        nonNullable:true, 
        validators: [Validators.required, Validators.min(1)]
      }),

    statusControl: new FormControl(false,
      {
        nonNullable:true, 
        validators: [Validators.required]
      }),

    townControl: new FormControl<string>('',
      {
        nonNullable:true, 
        validators: [Validators.required]
      }),
    
    bidControl: new FormControl<number>(0,
    {
      nonNullable:true, 
      validators: [Validators.required, Validators.min(10)]
    }),
    selectedKeywords: new FormControl<string[]>([],
      {
        nonNullable:true, 
        validators: [Validators.minLength(1)]
      }),
  })

  get title(){
    return this.createCampaignForm.controls.titleControl;
  }

  get radius(){
    return this.createCampaignForm.controls.radiusControl;
  }

  get bid(){
    return this.createCampaignForm.controls.bidControl;
  }

  get town(){
    return this.createCampaignForm.controls.townControl;
  }

  get keywordC(){
    return this.createCampaignForm.controls.keywordControl;
  }

  get fund(){
    return this.createCampaignForm.controls.fundControl;
  }

  get status(){
    return this.createCampaignForm.controls.statusControl;
  }

  get selectedKeywordsC(){
    return this.createCampaignForm.controls.selectedKeywords;
  }


  selectedKeywordsControl: string[] = [];
  keywords: string[] = ['Marketing', 'Sales', 'Development', 'Design', 'Management', 'Finance', 'HR'];
  suggestedKeyword: string = '';

  towns: string[] = ['Warszawa','Kraków','Lublin','Wrocław','Gdańsk'];

  emeraldBalance:number = 500;

  ngOnInit(): void {
    this.loadEmeraldBalance();
  }
  loadEmeraldBalance() {
    const storedBalance = localStorage.getItem('emeraldBalance');
    if (storedBalance !== null) {
      this.emeraldBalance = JSON.parse(storedBalance);
    }
  }
  saveEmeraldBalance() {
    localStorage.setItem('emeraldBalance', JSON.stringify(this.emeraldBalance));
  }

  updateSuggestion() {
    const value = this.createCampaignForm.controls.keywordControl.value.trim().toLowerCase();
    if (!value) {
      this.suggestedKeyword = '';
      return;
    }
    
    this.suggestedKeyword = this.keywords.find(keyword => keyword.toLowerCase().startsWith(value)) || '';
  }

  addKeyword(event: KeyboardEvent) {
    const input = this.createCampaignForm.controls.keywordControl.value.trim();
    
    if ((event.key === 'Enter' || event.key === ',') && input) {
      if (this.suggestedKeyword) {
        this.selectedKeywordsControl.push(this.suggestedKeyword);
      } else {
        this.selectedKeywordsControl.push(input);
      }
      
      this.createCampaignForm.controls.keywordControl.setValue('');
      this.suggestedKeyword = '';
      event.preventDefault();

      console.log(this.selectedKeywordsControl)
    }
  }

  removeKeyword(keyword: string) {
    this.selectedKeywordsControl = this.selectedKeywordsControl.filter(k => k !== keyword);
  }


  submitCampaign() {
    const fundValue = this.fund.value;
    if (fundValue > this.emeraldBalance) {
      console.log('Not enough funds');
      return;
    }

    const newCampaign = {
      title: this.title.value,
      radius: this.radius.value,
      keyword: this.keywordC.value,
      fund: this.fund.value,
      status: this.status.value ? 'ON' : 'OFF',
      town: this.town.value,
      bid: this.bid.value,
      selectedKeywords: this.selectedKeywordsControl
    };
  
    this.mockDataService.addCampaign(newCampaign);
    console.log('Wysłano kampanię:', newCampaign);

    this.emeraldBalance -= fundValue;
    this.saveEmeraldBalance();

    this.createCampaignForm.reset();
    this.selectedKeywordsControl = [];
  }
  
}