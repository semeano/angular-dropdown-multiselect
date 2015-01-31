!function(){"use strict";angular.module("ng-dropdown-multiselect",[]).directive("ngDropdownMultiselect",["$filter","$document",function(a,b){return{restrict:"AE",scope:{selectedModel:"=",options:"=",extraSettings:"=",events:"=",searchFilter:"=?",translationTexts:"=",groupBy:"@"},template:function(a,b){var c=b.checkboxes?!0:!1,d=b.groupBy?!0:!1,e='<div class="multiselect-parent btn-group dropdown-multiselect">';return e+='<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<i class="icon-down"></i></button>',e+="<ul class=\"dropdown-menu dropdown-menu-form\" ng-style=\"{display: (settings.alwaysOpened || open) ? 'block' : 'none', height : settings.scrollable ? settings.scrollableHeight : 'auto' }\" style=\"overflow: scroll\" >",e+='<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>',e+='<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>',e+='<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>',e+='<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>',e+='<li ng-show="settings.enableSearch" class="divider"></li>',e+='<li ng-show="settings.enableNewItem"><div class="dropdown-header"><form ng-submit="events.onNewItemAdd(newItem); newItem = \'\';"><input type="text" class="form-control" style="width: 100%;" ng-model="newItem" placeholder="{{texts.newItemPlaceholder}}" /></form></li>',e+='<li ng-show="settings.enableNewItem" class="divider"></li>',d?(e+='<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>',e+='<li ng-repeat-end role="presentation">'):e+='<li role="presentation" ng-repeat="option in options | filter: searchFilter">',e+='<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">',e+=c?'<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick(event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>':"<span class=\"glyphicon\" data-ng-class=\"{'glyphicon-ok': isChecked(getPropertyForObject(option,settings.idProp)), 'glyphicon-remove': !isChecked(getPropertyForObject(option,settings.idProp))}\"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>",e+="</li>",e+='<li class="divider" ng-show="settings.selectionLimit > 1"></li>',e+='<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>',e+="</ul>",e+="</div>"},link:function(c,d,e){function f(a){var b={};return""===c.settings.externalIdProp?b[c.settings.idProp]=a:b[c.settings.externalIdProp]=a,b}function g(a){for(var b in a)delete a[b]}var h=d.children()[0];c.toggleDropdown=function(){c.open=!c.open},c.checkboxClick=function(a,b){c.setSelectedItem(b),a.stopImmediatePropagation()},c.externalEvents={onItemSelect:angular.noop,onItemDeselect:angular.noop,onSelectAll:angular.noop,onDeselectAll:angular.noop,onInitDone:angular.noop,onMaxSelectionReached:angular.noop,onNewItemAdd:angular.noop},c.settings={dynamicTitle:!0,scrollable:!1,scrollableHeight:"300px",closeOnBlur:!0,displayProp:"label",idProp:"id",externalIdProp:"id",enableSearch:!1,enableNewItem:!1,selectionLimit:0,showCheckAll:!0,showUncheckAll:!0,closeOnSelect:!1,buttonClasses:"btn btn-default",closeOnDeselect:!1,groupBy:e.groupBy||void 0,groupByTextProvider:null,smartButtonMaxItems:0,smartButtonTextConverter:angular.noop},c.texts={checkAll:"Check All",uncheckAll:"Uncheck All",selectionCount:"checked",selectionOf:"/",searchPlaceholder:"Search...",newItemPlaceholder:"New item",buttonDefaultText:"Select",dynamicButtonTextSuffix:"checked"},c.searchFilter=c.searchFilter||"",angular.isDefined(c.settings.groupBy)&&c.$watch("options",function(b){angular.isDefined(b)&&(c.orderedItems=a("orderBy")(b,c.settings.groupBy))}),angular.extend(c.settings,c.extraSettings||[]),angular.extend(c.externalEvents,c.events||[]),angular.extend(c.texts,c.translationTexts),c.singleSelection=1===c.settings.selectionLimit,c.singleSelection&&angular.isArray(c.selectedModel)&&0===c.selectedModel.length&&g(c.selectedModel),c.settings.closeOnBlur&&b.on("click",function(a){for(var b=a.target.parentElement,d=!1;angular.isDefined(b)&&null!==b&&!d;)_.contains(b.className.split(" "),"multiselect-parent")&&!d&&b===h&&(d=!0),b=b.parentElement;d||c.$apply(function(){c.open=!1})}),c.getGroupTitle=function(a){return null!==c.settings.groupByTextProvider?c.settings.groupByTextProvider(a):a},c.getButtonText=function(){if(c.settings.dynamicTitle&&angular.isObject(c.selectedModel)&&(c.selectedModel.length>0||_.keys(c.selectedModel).length>0)){if(c.settings.smartButtonMaxItems>0){var a=[];return angular.forEach(c.options,function(b){if(c.isChecked(c.getPropertyForObject(b,c.settings.idProp))){var d=c.getPropertyForObject(b,c.settings.displayProp),e=c.settings.smartButtonTextConverter(d,b);a.push(e?e:d)}}),c.selectedModel.length>c.settings.smartButtonMaxItems&&(a=a.slice(0,c.settings.smartButtonMaxItems),a.push("...")),a.join(", ")}var b;return b=c.singleSelection?null!==c.selectedModel&&angular.isDefined(c.selectedModel[c.settings.idProp])?1:0:angular.isDefined(c.selectedModel)?c.selectedModel.length:0,0===b?c.texts.buttonDefaultText:b+" "+c.texts.dynamicButtonTextSuffix}return c.texts.buttonDefaultText},c.getPropertyForObject=function(a,b){return angular.isDefined(a)&&a.hasOwnProperty(b)?a[b]:""},c.selectAll=function(){c.deselectAll(!1),c.externalEvents.onSelectAll(),angular.forEach(c.options,function(a){c.setSelectedItem(a[c.settings.idProp],!0)})},c.deselectAll=function(a){a=a||!0,a&&c.externalEvents.onDeselectAll(),c.singleSelection?g(c.selectedModel):c.selectedModel.splice(0,c.selectedModel.length)},c.setSelectedItem=function(a,b){var d=f(a),e=null;if(e=""===c.settings.externalIdProp?_.find(c.options,d):d,c.singleSelection)return g(c.selectedModel),angular.extend(c.selectedModel,e),void c.externalEvents.onItemSelect(e);b=b||!1;var h=-1!==_.findIndex(c.selectedModel,d);!b&&h?(c.selectedModel.splice(_.findIndex(c.selectedModel,d),1),c.externalEvents.onItemDeselect(d)):!h&&(0===c.settings.selectionLimit||c.selectedModel.length<c.settings.selectionLimit)&&(c.selectedModel.push(e),c.externalEvents.onItemSelect(e))},c.isChecked=function(a){return c.singleSelection?null!==c.selectedModel&&angular.isDefined(c.selectedModel[c.settings.idProp])&&c.selectedModel[c.settings.idProp]===f(a)[c.settings.idProp]:-1!==_.findIndex(c.selectedModel,f(a))},c.externalEvents.onInitDone()}}}])}(),function(){"use strict";var a=["ng-dropdown-multiselect"];angular.module("ngDropdownMultiselectDemo",a).controller("ngDropdownMultiselectDemoCtrl",["$scope",function(a){a.examplemodel=[],a.exampledata=[{id:1,label:"David"},{id:2,label:"Jhon"},{id:3,label:"Danny"}],a.examplesettings={showCheckAll:!1,showUncheckAll:!1,dynamicTitle:!0,smartButtonMaxItems:3,enableNewItem:!0},a.exampleevents={onNewItemAdd:function(b){var c=a.exampledata.lenght+1;a.exampledata.push({id:c,label:b})}}}])}();