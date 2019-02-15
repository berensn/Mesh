export class Globals{

  /*
    Format of console.log: (logging)(locText)(itemText)(valText) where
    logging: boolean,
    locText: filename/methodname,
    itemText: variable name,
    valText: variable value
    ex:   if(logging) console.log('%c[filename.ts][methodName()] %citem: %c%s', this.locText, this.itemText, this.valText, this.item);
      %c inserts CSS rule(s) at location and applies them until the end of the log or a new rule is implemented
      %s inserts item value at location
  */
  // Variables
  private locText = [            // Console color for locText text
    'color: #00ff00'
  ].join(';');
  private itemText = [            // Console color for item text
    'color: #3f89d3'
  ].join(';');
  private valText = [             // Console color for value text
    'color: #3fd394'
  ].join(';');
  private logging = false;         // Turn console logging on/off

  // Getters
  get loc(){                      // Getter for locText color
    return this.locText;
  }
  get item(){                     // Getter for itemText color
    return this.itemText;
  }
  get val(){                      // Getter for valText color
    return this.valText;
  }
  get log(){                      // Getter for turning logging on/off
    return this.logging;
  }

  /* List of page numbers w/ First/Prev|Next/Last. Grokked w/ modifications from
    http://jasonwatmore.com/post/2016/08/23/angular-2-pagination-example-with-logic-like-google
  */
  pageNumberList(totalPages, currentPage){
    let pageList = [];
    if (totalPages <= 10){
      for (let i = 1; i <= totalPages; i++){
        pageList.push(i);
      }
    }else{
      let listStart;
      let listEnd;
      if (currentPage <= 6){
        listStart = 1;
        listEnd = 10;
        if (this.logging) console.log('%c[globals.ts][pageNumberList()] %ccondition tree: %cif/else/if', this.locText, this.itemText, this.valText);
      }else if (currentPage +4 >= totalPages){
        listStart = totalPages -9;
        listEnd = totalPages;
        if (this.logging) console.log('%c[globals.ts][pageNumberList()] %ccondition tree: %cif/else/else if', this.locText, this.itemText, this.valText);
      }else{
        listStart = totalPages - 9;
        listEnd = totalPages + 4;
        if (listEnd > totalPages){listEnd = totalPages}
        if (this.logging) console.log('%c[globals.ts][pageNumberList()] %ccondition tree: %cif/else/else', this.locText, this.itemText, this.valText);
      }
      for (let i = listStart; i <= listEnd; i++){
        pageList.push(i);
      }      
      if (this.logging) console.log('%c[globals.ts][pageNumberList()] %clistStart: %c%s', this.locText, this.itemText, this.valText, listStart);
      if (this.logging) console.log('%c[globals.ts][pageNumberList()] %clistEnd: %c%s', this.locText, this.itemText, this.valText, listEnd);
    }
    if (totalPages != 1){
      if (currentPage == 1){
        pageList.push('Next', 'Last');
      }else if (currentPage == totalPages){
        pageList.unshift('First', 'Prev');
      }else{
        pageList.push('Next', 'Last');
        pageList.unshift('First', 'Prev')
      }
    }
    return pageList;
  }

  // Sets current page to page selected
  pageJump(newpage, currentPage, totalPages){
    switch (newpage){
      case 'First':{
        currentPage = 1;
        break;
      }
      case 'Prev':{
        currentPage -= 1;
        break;
      }
      case 'Next':{
        currentPage += 1;
        break;
      }
      case 'Last':{
        currentPage = totalPages;
        break;
      }
      default:{
        currentPage = newpage;
        break;
      }
    }
    return currentPage;
  }
}
