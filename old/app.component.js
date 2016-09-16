"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var proximity_selector_component_1 = require('./components/proximity-selector.component');
var search_box_component_1 = require('./components/search-box.component');
var search_reducer_1 = require('./reducers/search.reducer');
var storeManager = store_1.provideStore({ currentSearch: search_reducer_1.SearchReducer });
var AppComponent = (function () {
    function AppComponent(store, youtube) {
        var _this = this;
        this.store = store;
        this.youtube = youtube;
        this.title = 'One Source of Truth for Angular 2';
        this.searchResults = [];
        this.disableSearch = false;
        this.currentSearch = this.store.select('currentSearch');
        this.youtube.searchResults.subscribe(function (results) { return _this.searchResults = results; });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentSearch.subscribe(function (state) {
            _this.state = state;
            if (state && state.name && state.name.length > 0) {
                _this.disableSearch = false;
                _this.youtube.search(state);
            }
            else {
                _this.disableSearch = true;
                _this.searchResults = [];
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [storeManager],
            directives: [search_box_component_1.SearchBox, proximity_selector_component_1.ProximitySelector],
            template: "\n    <section class=\"col-md-8\">\n        <h1>{{title}}</h1>\n        <div class=\"row col-md-8\">\n            <search-box [store]=\"store\"></search-box>\n            <proximity-selector [store]=\"store\" [disabled]=\"disableSearch\"\n                [ngClass]=\"{ disabled: disableSearch }\"></proximity-selector>\n        </div>\n        <div class=\"row col-md-8 alert alert-danger\" *ngIf=\"disableSearch\">\n            <p>Can't use geolocalization with an empty searchbox</p>\n        </div>\n        <div class=\"row col-md-8\">\n            <p>\n                Try to type something in the searchbox, play with the location and with radius: the above state will\n                always be consistent and up to date.\n            </p>\n            <p class=\"state\">{{ state | json }}</p>\n            <p class=\"state\" *ngIf=\"disableSearch\">{ }</p>\n        </div>\n        <h2 *ngIf=\"!disableSearch\">Search results:</h2>\n        <h2 *ngIf=\"disableSearch || searchResults.length == 0\">No results</h2>\n        <div class=\"row col-md-8\">\n            <div *ngFor=\"let result of searchResults\" class=\"thumbnail col-sm-6 col-md-4\">\n                <div class=\"caption\">\n                    <h3>{{ result.title }}</h3>\n                </div>\n                <!--<img src=\"{{ result.thumbnailUrl }}\" />-->\n            </div>\n        </div>\n    </section>\n    "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;