import {Component, OnInit} from '@angular/core';
import {AppService} from "./services/app.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';


	sidebarCollapsed: boolean = true;

	constructor(private appService: AppService) {

		this.appService.sidebarToggle.subscribe(collapsed => this.sidebarCollapsed = collapsed);
		this.sidebarCollapsed = this.appService.configStorage.sidebarCollapsed;

	}

	/**
	 * Toogle sidebar left
	 * @param toggle
	 */
	toggleSidebar(toggle: boolean) {
		this.appService.sidebarToggle.next(toggle);
	}

	ngOnInit() {


	}
}
