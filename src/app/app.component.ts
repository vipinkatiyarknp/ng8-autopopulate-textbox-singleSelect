import { Component, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class AppComponent {

  constructor(private http: HttpClient, private eref: ElementRef) { }
  listData: any;
  filteredList = [];
  showList = false;
  selectedListItem = "";
  // @HostListener('click') onClick($event) {
  //   if (!this.eref.nativeElement.contains($event.target)) {
  //     this.showList = false;
  //   }
  // }
  filter(evt) {
    if (evt.target.value) {
      this.http.get('../assets/list.json').subscribe(res => {
        this.listData = res;
        this.filteredList = this.listData.filter(item => {
          this.showList = true;
          const valueToSearch = evt.target.value ? evt.target.value.toLowerCase() : '';
          const itemFromSearch = item.name ? item.name.toLowerCase() : '';
          return itemFromSearch.includes(valueToSearch);
        });
      });
    } else {
      this.showList = false;
    }


  }
  onClick(event) {
    this.showList = false;
  }
  selectItem(item) {
    this.selectedListItem = item.name;
    console.log(item);
  }
}
